import React from 'react';
import { FlatList, Text, Pressable, View, StyleSheet } from 'react-native';
import axios from 'axios';
import { DanbooruAutocompleteResponse } from '../../../interfaces/types';
import { returnLastTag } from '../../../helpers/formatSearch';

interface Props {
    text: string,
    handleSuggestion: Function,
}

const Autocomplete = ({ text, handleSuggestion }: Props): JSX.Element | null => {
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

    if (suggestions.length === 0) {
        return null;
    } else {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={suggestions}
                    keyExtractor={item => item.value}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => handleSuggestion(item.value)}>
                            <View style={styles.suggestionContainer}>
                                <Text style={styles.suggestion}>{item.label}</Text>
                                <Text style={styles.suggestion}>{item.post_count}</Text>
                            </View>
                        </Pressable>
                    )}
                />
            </View>
        )
    }
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
    suggestionContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    suggestion: {
        color: '#242424',
    }
});

export default Autocomplete;
