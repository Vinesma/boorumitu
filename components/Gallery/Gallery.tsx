/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';
import { GalleryRouteProp } from '../../interfaces/types';

interface Props {
    route: GalleryRouteProp,
}

const Gallery = ({ route }: Props): JSX.Element => {
    return (
        <View>
            <Text>This is now the gallery!</Text>
            <Text>You searched for {route.params.searchText}!</Text>
        </View>
    );
};

export default Gallery;
