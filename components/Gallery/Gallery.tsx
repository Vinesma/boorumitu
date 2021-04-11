import React from 'react';
import {
    View,
    ScrollView,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    useWindowDimensions,
    ActivityIndicator,
    GestureResponderEvent
} from 'react-native';
import axios from 'axios';
import PressableImage from './subComponents/PressableImage';
import { DanbooruPosts, GalleryRouteProp } from '../../interfaces/types';
import ImageModal from './subComponents/ImageModal';

interface Props {
    route: GalleryRouteProp,
}

const imagePreviewSize = 130;

const Gallery = ({ route }: Props): JSX.Element => {
    const [posts, setPosts] = React.useState<DanbooruPosts>([]);
    const [page, setPage] = React.useState<number>(1);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [modalUrl, setModalUrl] = React.useState<string>('');
    const windowWidth = useWindowDimensions().width;
    const { searchText } = route.params;
    const isTesting = true;

    const fetchPosts = () => {
        axios.get(`https://${isTesting ? 'test' : 'dan'}booru.donmai.us/posts.json?page=${page}&tags=${searchText}`)
            .then(response => {
                setPosts(posts.concat(response.data));
                setPage(prevPage => prevPage + 1);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleModal = () => {
        setModalVisible(!modalVisible);
    }

    const handleImagePress = (url: string) => {
        setModalUrl(url);
        handleModal();
    };

    React.useEffect(() => {
        setLoading(true);
        fetchPosts();

        return () => {
            setPosts([]);
            setPage(1);
            setLoading(true);
        };
    }, []);

    return (
        <View style={styles.container}>
            { loading ? <ActivityIndicator size="large" /> : null}
            <ImageModal visible={modalVisible} url={modalUrl} handleModal={handleModal}/>
            <FlatList
                data={posts}
                key={windowWidth}
                numColumns={~~(windowWidth / imagePreviewSize)}
                keyExtractor={item => String(item.id)}
                style={styles.gallery}
                onEndReached={() => fetchPosts()}
                renderItem={({ item }) => (
                        <PressableImage
                            image={item}
                            handlePress={handleImagePress}
                        />
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
        padding: 8,
    },
    image: {
        width: imagePreviewSize,
        height: imagePreviewSize,
    },
    imageFull: {
        width: '100%',
        height: 400,
    }
});

export default Gallery;