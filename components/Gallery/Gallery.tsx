/* eslint-disable prettier/prettier */
import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { DanbooruPosts, GalleryRouteProp } from '../../interfaces/types';

interface Props {
    route: GalleryRouteProp,
}

const Gallery = ({ route }: Props): JSX.Element => {
    const [posts, setPosts] = React.useState<DanbooruPosts>([]);
    const [page, setPage] = React.useState<number>(1);
    const { searchText } = route.params;
    const isTesting = true;

    const fetchPosts = () => {
        axios.get(`https://${isTesting ? 'test' : 'dan'}booru.donmai.us/posts.json?page=${page}&tags=${searchText}`)
            .then(response => {
                setPosts(prevPosts => [...prevPosts, response.data]);
                setPage(prevPage => prevPage + 1);

                console.info(`Fetched ${response.data.length} posts.`);
            })
            .catch(error => {
                console.error(error);
            });
    };

    React.useEffect(() => {
        fetchPosts();

        return () => setPosts([]);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                numColumns={2}
                keyExtractor={item => String(item.id)}
                style={styles.gallery}
                renderItem={
                    ({ item }) => (
                    <Image source={{ uri: item.preview_file_url }}/>
                    )
                }/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242424',
    },
    gallery: {
        padding: 4,
    },
    image: {
        width: 110,
        height: 110,
    },
});

export default Gallery;
