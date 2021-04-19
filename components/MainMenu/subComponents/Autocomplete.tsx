import React from 'react';
import { FlatList, Text, Pressable, View, StyleSheet } from 'react-native';
import { AutocompleteResponse, Site } from '../../../interfaces/types';
import { returnLastTag } from '../../../helpers/formatSearch';
import useAxiosRequest from '../../../hooks/useAxiosRequest';

interface Props {
    text: string,
    handleSuggestion: (arg0: string) => void,
    site: Site,
}

const Autocomplete = ({ text, handleSuggestion, site }: Props): JSX.Element | null => {
    const [suggestions, setSuggestions] = React.useState<AutocompleteResponse>([]);
    const { get, requestValue, requestStatus, requestError } = useAxiosRequest("danbooru", []);

    React.useEffect(() => {
        if (requestStatus === "success") {
            setSuggestions(requestValue);
        } else if (requestStatus === "error") {
            console.error(`Autocomplete: ${requestError}`);
        }
    }, [requestStatus]);

    React.useEffect(() => {
        if (text !== '') {
            switch (site) {
                case "gelbooru":
                    get(`/index.php?page=autocomplete2&term=${returnLastTag(text)}&type=tag_query&limit=6`)
                case "danbooru":
                case "yande.re":
                default:
                    get(`/autocomplete.json?search[query]=${returnLastTag(text)}&search[type]=tag_query&limit=6`);
                    break;
            } 
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
