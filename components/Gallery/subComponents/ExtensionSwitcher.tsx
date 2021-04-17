import React from 'react';
import { Animated, useWindowDimensions, StyleSheet } from 'react-native';
import { GenericImage } from '../../../interfaces/types';
import Video from 'react-native-video';

interface Props {
    source: GenericImage,
    handleLoading: Function,
}

const ExtensionSwitcher = ({ source, handleLoading }: Props) => {
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;

    switch(source.file_ext) {
        case "mp4":
            return (
                <Video
                    source={{ uri: source.file_url }}
                    style={[{ width, height }, styles.player]}
                    controls
                    muted
                    repeat
                    resizeMode="contain"
                    onLoadStart={() => handleLoading(true)}
                    onReadyForDisplay={() => handleLoading(false)}
                />
            )
        case "zip":
            return (
                <Video
                    source={{ uri: source.large_file_url }}
                    style={[{ width, height }, styles.player]}
                    controls
                    muted
                    repeat
                    resizeMode="contain"
                    onLoadStart={() => handleLoading(true)}
                    onReadyForDisplay={() => handleLoading(false)}
                />
            )
        default:
            return (
                <Animated.Image
                    resizeMode="center"
                    onLoadStart={() => handleLoading(true)}
                    onLoadEnd={() => handleLoading(false)}
                    style={{
                        width,
                        height,
                    }}
                    source={{ uri: source.file_url }}
                />
            )
    }
};

const styles = StyleSheet.create({
    player: {
        backgroundColor: '#242424',
    }
});

export default ExtensionSwitcher;
