import React from 'react';
import { View, ActivityIndicator } from 'react-native';

interface Props {
    size: "small" | "large",
    color: string,
    backgroundColor?: string,
}

const Loader = ({ size, color, backgroundColor = '#242424' }: Props): JSX.Element => (
    <View style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
    }}>
        <ActivityIndicator size={size} color={color}/>
    </View>
)

export default Loader;
