import React from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { MainMenuNavigationProp } from '../../interfaces/types';
import { formatDanbooru, shouldAppend, returnFirstTag } from '../../helpers/formatSearch';
import Autocomplete from './subComponents/Autocomplete';

interface Props {
    navigation: MainMenuNavigationProp,
}

const MainMenu = ({ navigation }: Props): JSX.Element => {
    const [searchText, setSearchText] = React.useState<string>('');

    const handleNavigation = () => {
        if (searchText !== '') {
            navigation.navigate('Gallery', { searchText: formatDanbooru(searchText) });
        }
    };

    const handleSuggestion = (suggestion: string) => {
        if (shouldAppend(searchText)) {
            setSearchText(prevString => `${returnFirstTag(prevString)} ${suggestion}`);
        } else {
            setSearchText(suggestion);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>BOORUMITU</Text>
            <View style={styles.searchContainer}>
                <TextInput style={styles.input} value={searchText} onChangeText={text => setSearchText(text)}/>
                <Button
                    title="  Search  "
                    color="#ee9818"
                    onPress={() => handleNavigation()}
                />
            </View>
            <View style={styles.searchContainer}>
                <Button title="  Clear  " color="#ff0000" onPress={() => setSearchText('')} />
            </View>
            <Autocomplete text={searchText} handleSuggestion={handleSuggestion}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#242424',
    },
    title: {
        fontSize: 26,
        color: '#FFF',
    },
    searchContainer: {
        alignItems: 'center',
        width: '80%',
        marginTop: 16,
    },
    input: {
        width: '80%',
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: '#FFF',
        color: '#242424',
    },
});

export default MainMenu;
