import React from 'react';
import { Pressable, Image } from 'react-native';
import { GenericImage } from '../../../interfaces/types';

interface Props {
    image: GenericImage,
    handlePress: (arg0: GenericImage) => void,
    size: number,
}

const PressableImage = ({ image, handlePress, size }: Props): JSX.Element => {
    return (
        <Pressable onPress={() => handlePress(image)}>
            <Image
                style={{ width: size, height: size }}
                source={{ uri: image.preview_url }}
            />
        </Pressable>
    )
};

export default PressableImage;
