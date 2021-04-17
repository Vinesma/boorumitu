import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    useWindowDimensions,
} from 'react-native';
import PressableImage from './subComponents/PressableImage';
import { GenericPosts, GenericImage, GalleryRouteProp } from '../../interfaces/types';
import ImageModal from './subComponents/ImageModal';
import Loader from '../Loader/Loader';
import { emptyImage } from '../../helpers/emptyImage';
import useAxiosRequest from '../../hooks/useAxiosRequest';

interface Props {
    route: GalleryRouteProp,
}

const Gallery = ({ route }: Props): JSX.Element => {
    const { searchText } = route.params;
    const { get, requestValue, requestStatus, requestError } = useAxiosRequest<GenericPosts>(route.params.site, []);
    const [posts, setPosts] = React.useState<GenericPosts>([]);
    const [page, setPage] = React.useState<number>(1);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [modalImage, setModalImage] = React.useState<GenericImage>(emptyImage);
    const windowWidth = useWindowDimensions().width;
    const imagePreviewSize = 130;

    const fetchPosts = () => {
        switch(route.params.site) {
            case "danbooru":
                get(`/posts.json?page=${page}&tags=${searchText}`);
                break;
            case "yande.re":
                get(`/post.json?page=${page}&tags=${searchText}`);
                break;
            default:
                get(`/posts.json?page=${page}&tags=${searchText}`);
                break;
        }
        setLoading(false);
    };

    const handleModal = () => {
        setModalVisible(!modalVisible);
    }

    const handleImagePress = (image: GenericImage) => {
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

    React.useEffect(() => {
        if (requestStatus === "success") {
            setPosts(posts.concat(requestValue));
            setPage(prevPage => prevPage + 1);
        } else if (requestStatus === "error") {
            console.error(requestError);
        }
    }, [requestStatus]);

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
