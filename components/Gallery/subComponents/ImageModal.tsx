import React from 'react';
import {
    Modal,
    View,
    StyleSheet,
} from 'react-native';
import { DanbooruImage } from '../../../interfaces/types';
import Loader from '../../Loader/Loader';
import ExtensionSwitcher from './ExtensionSwitcher';

interface Props {
    visible: boolean,
    image: DanbooruImage,
    handleModal: Function,
}

const ImageModal = ({ visible, image, handleModal }: Props): JSX.Element => {
    const [loading, setLoading] = React.useState<boolean>(true);

    const handleLoading = (isLoading: boolean): void => {
        setLoading(isLoading);
    }

    return (
        <Modal
            animationType="fade"
            visible={visible}
            onRequestClose={() => handleModal()}
        >
            <View style={styles.container}>
                { loading ? <Loader size="large" color="#ee9818"/> : null}
                <ExtensionSwitcher source={image} handleLoading={handleLoading}/>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242424',
    },
});

export default ImageModal;
