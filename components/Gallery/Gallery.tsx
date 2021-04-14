import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import PressableImage from './subComponents/PressableImage';
import { DanbooruPosts, GalleryRouteProp, DanbooruImage } from '../../interfaces/types';
import ImageModal from './subComponents/ImageModal';
import Loader from '../Loader/Loader';
import {emptyImage} from '../../helpers/emptyImage';

interface Props {
    route: GalleryRouteProp,
}

const Gallery = ({ route }: Props): JSX.Element => {
    const [posts, setPosts] = React.useState<DanbooruPosts>([]);
    const [page, setPage] = React.useState<number>(1);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [modalImage, setModalImage] = React.useState<DanbooruImage>(emptyImage);
    const windowWidth = useWindowDimensions().width;
    const imagePreviewSize = 130;
    const isTesting = false;
    const { searchText } = route.params;

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

    const handleImagePress = (image: DanbooruImage) => {
        setModalImage(image);
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
            {loading ? <Loader size="large" color="#ee9818" /> : null}
            <ImageModal visible={modalVisible} image={modalImage} handleModal={handleModal}/>
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
                            size={imagePreviewSize}
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
});

export default Gallery;
