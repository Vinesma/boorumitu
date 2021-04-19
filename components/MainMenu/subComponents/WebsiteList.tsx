import React from 'react';
import { Modal, SectionList, Text, StyleSheet } from 'react-native';
import { Site } from '../../../interfaces/types';

interface Props {
    modalVisible: boolean,
    handleModal: () => void,
    setWebsite: (arg0: Site) => void,
}

const WebsiteList = ({ modalVisible, handleModal, setWebsite }: Props): JSX.Element => (
    <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => handleModal()}
    >
        <SectionList
            sections={[
                {title: 'D', data: ['danbooru']},
                {title: 'G', data: ['gelbooru']},
                {title: 'Y', data: ['yande.re']},
            ]}
            renderItem={
                ({ item }) => (
                    <Text 
                        style={styles.sectionItem}
                        onPress={() => {
                            setWebsite(item as Site);
                            handleModal();
                        }}
                    >
                        {item}
                    </Text>
                )
            }
            renderSectionHeader={
                ({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>
            }
            keyExtractor={(item, index) => String(index)}
        />
    </Modal>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242424',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 24,
        color: '#FFF',
        backgroundColor: '#353535',
    },
    sectionItem: {
        paddingTop: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 1,
        fontSize: 20,
        color: '#242424',
    },
});

export default WebsiteList;