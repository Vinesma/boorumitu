import React from 'react';
import { FlatList, Text, Pressable, View, StyleSheet } from 'react-native';
import axios from 'axios';
import { DanbooruAutocompleteResponse } from '../../../interfaces/types';
import { returnLastTag } from '../../../helpers/formatSearch';

interface Props {
    text: string,
    handleSuggestion: Function,
}

const Autocomplete = ({ text, handleSuggestion }: Props) => {
    const [suggestions, setSuggestions] = React.useState<DanbooruAutocompleteResponse>([]);

    const querySuggestions = () => {
        axios
            .get(`https://danbooru.donmai.us/autocomplete.json?search[query]=${returnLastTag(text)}&search[type]=tag_query&limit=6`)
            .then(response => {
                setSuggestions(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    React.useEffect(() => {
        if (text !== '') {
            querySuggestions();
        } else {
            setSuggestions([]);
        }

        return () => setSuggestions([]);
    }, [text]);

    return (
        <View style={styles.container}>
            {suggestions.length > 0 ? (
                <FlatList
                    style={styles.list}
                    data={suggestions}
                    keyExtractor={item => item.value}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => handleSuggestion(item.value)}>
                            <Text style={styles.suggestion}>{item.label}</Text>
                        </Pressable>
                    )}
                />
            ): null}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: '80%',
    },
    list: {
        padding: 10,
        backgroundColor: '#FFF',
    },
    suggestion: {
        color: '#242424',
    }
});

export default Autocomplete;
