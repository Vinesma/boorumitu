/* eslint-disable prettier/prettier */
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    Menu: undefined,
    Gallery: { searchText: string },
};

// Stack Props
export type MainMenuNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Menu'
>;

// Route Props
export type GalleryRouteProp = RouteProp<RootStackParamList, 'Gallery'>;
