import React from 'react';
import { Modal, ScrollView, Image, StyleSheet } from 'react-native';

interface Props {
    visible: boolean,
    url: string,
    handleModal: Function,
}

const ImageModal = ({ visible, url, handleModal }: Props): JSX.Element => (
    <Modal
        animationType="fade" 
        visible={visible}
        transparent 
        onRequestClose={() => handleModal()}
    >
        <ScrollView style={styles.container}>
            <Image style={styles.imageFull} source={{ uri: url }} />
        </ScrollView>
    </Modal>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242424',
    },
    imageFull: {
        width: '100%',
        height: 400,
    }
});

export default ImageModal;