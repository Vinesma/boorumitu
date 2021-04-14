import React from 'react';
import {
    Modal,
    View,
    Animated,
    StyleSheet,
    useWindowDimensions
} from 'react-native';
import {
    PinchGestureHandler,
    HandlerStateChangeEvent,
    PinchGestureHandlerEventPayload,
    State
} from 'react-native-gesture-handler';
import Video from 'react-native-video';
import Loader from '../../Loader/Loader';

interface Props {
    visible: boolean,
    uri: string,
    handleModal: Function,
}

const ImageModal = ({ visible, uri, handleModal }: Props): JSX.Element => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;
    const scale = React.useRef(new Animated.Value(1)).current;

    const onGestureEvent = Animated.event([
        { nativeEvent: { scale } }
    ], { useNativeDriver: true });

    const onHandlerStateChange = (event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }
    }

    return (
        <Modal
            animationType="fade"
            visible={visible}
            onRequestClose={() => handleModal()}
        >
            { loading ? <Loader size="large" color="#ee9818"/> : null }
            { uri.endsWith(".mp4") ? (
                <Video
                    source={{ uri }}
                    style={[{ width, height }, styles.player]}
                    controls
                    muted
                    repeat
                    resizeMode="contain"
                    onLoadStart={() => setLoading(true)}
                    onReadyForDisplay={() => setLoading(false)}
                />
            ) : (
                <View style={styles.container}>
                    <PinchGestureHandler onGestureEvent={() => onGestureEvent()} onHandlerStateChange={event => onHandlerStateChange(event)}>
                        <Animated.Image
                            resizeMode="center"
                            onLoadStart={() => setLoading(true)}
                            onLoadEnd={() => setLoading(false)}
                            style={{
                                width,
                                height,
                                transform: [{ scale }],
                            }}
                            source={{ uri }}
                        />
                    </PinchGestureHandler>
                </View>
            )}
        </Modal>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242424',
    },
    player: {
        backgroundColor: '#242424',
    }
});

export default ImageModal;
