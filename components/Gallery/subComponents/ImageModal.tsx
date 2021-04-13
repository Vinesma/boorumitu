import React from 'react';
import { Modal, View, Image, StyleSheet, useWindowDimensions } from 'react-native';

interface Props {
    visible: boolean,
    uri: string,
    handleModal: Function,
}

const ImageModal = ({ visible, uri, handleModal }: Props): JSX.Element => {
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;

    return (
        <Modal
            animationType="fade"
            visible={visible}
            onRequestClose={() => handleModal()}
        >
            <View style={styles.container}>
                <Image
                    resizeMode="center"
                    style={{
                        width,
                        height,
                    }}
                    source={{ uri }}
                />
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
