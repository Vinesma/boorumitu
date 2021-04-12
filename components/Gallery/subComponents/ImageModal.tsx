import React from 'react';
import { Modal, ScrollView, Image, StyleSheet } from 'react-native';

interface Props {
    visible: boolean,
    uri: string,
    handleModal: Function,
}

const ImageModal = ({ visible, uri, handleModal }: Props): JSX.Element => {
    return (
        <Modal
            animationType="fade"
            visible={visible}
            onRequestClose={() => handleModal()}
        >
            <ScrollView style={styles.container}>
                <Image
                    style={styles.imageFull}
                    source={{ uri }}
                />
            </ScrollView>
        </Modal>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242424',
    },
    imageFull: {
        marginTop: '45%',
        width: '100%',
        height: 400,
    }
});

export default ImageModal;
