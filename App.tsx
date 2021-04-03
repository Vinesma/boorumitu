/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './interfaces/types';
import MainMenu from './components/MainMenu/MainMenu';
import Gallery from './components/Gallery/Gallery';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Menu">
                <Stack.Screen
                    name="Menu"
                    component={MainMenu}
                    options={{ title: '見つけた!' }}
                />
                <Stack.Screen
                    name="Gallery"
                    component={Gallery}
                    options={{ title: 'Gallery' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
