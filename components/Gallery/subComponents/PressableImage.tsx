import React from 'react';
import { Pressable, Image, StyleSheet, Alert } from 'react-native';
import { DanbooruImage } from '../../../interfaces/types';

interface Props {
    image: DanbooruImage,
    handlePress: Function,
}

const PressableImage = ({ image, handlePress }: Props): JSX.Element => {
    return (
        <Pressable onPress={() => handlePress(image.file_url)}>
            <Image style={styles.image} source={{ uri: image.preview_file_url }}/>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    image: {
        width: 130,
        height: 130,
    },
});

export default PressableImage;