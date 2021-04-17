import React from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, Button } from 'react-native';
import { MainMenuNavigationProp, Site } from '../../interfaces/types';
import { switchSearch, shouldAppend, returnFirstTag } from '../../helpers/formatSearch';
import Autocomplete from './subComponents/Autocomplete';

interface Props {
    navigation: MainMenuNavigationProp,
}

const MainMenu = ({ navigation }: Props): JSX.Element => {
    const [searchText, setSearchText] = React.useState<string>('');
    const [site, setSite] = React.useState<Site>('danbooru');

    const handleNavigation = () => {
        if (searchText !== '') {
            navigation.navigate('Gallery', { 
                searchText: switchSearch(searchText, site),
                site,
            });
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
            {/* <ScrollView style={{ width: '80%', marginTop: 16}}>
                <Text style={styles.text}>Which site to use?</Text>
                <Text style={styles.text} onPress={() => {
                    setSite("danbooru");
                    console.info("set to danbooru");
                }}>Danbooru</Text>
                <Text style={styles.text} onPress={() => {
                    setSite("yande.re");
                    console.info("set to yande.re");
                }}>Yande.re</Text>
            </ScrollView> */}
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
    text: {
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