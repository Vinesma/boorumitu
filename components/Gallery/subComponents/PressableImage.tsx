import React from 'react';
import { Pressable, Image } from 'react-native';
import { DanbooruImage } from '../../../interfaces/types';

interface Props {
    image: DanbooruImage,
    handlePress: Function,
    size: number,
}

const PressableImage = ({ image, handlePress, size }: Props): JSX.Element => {
    return (
        <Pressable onPress={() => handlePress(image)}>
            <Image
                style={{ width: size, height: size }}
                source={{ uri: image.preview_file_url }}
            />
        </Pressable>
    )
};

export default PressableImage;
