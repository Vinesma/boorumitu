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

// ResponseProps
export interface DanbooruImage {
    id: number,
    created_at: string,
    updated_at: string,
    up_score: number,
    down_score: number,
    score: number,
    source: string,
    md5: string,
    rating: 's' | 'q' | 'e' | null,
    is_note_locked: boolean,
    is_rating_locked: boolean,
    is_status_locked: boolean,
    is_pending: boolean,
    is_flagged: boolean,
    is_deleted: boolean,
    uploader_id: number,
    approver_id: number | null,
    pool_string: string,
    last_noted_at: string | null,
    last_comment_bumped_at: string | null,
    fav_count: number,
    tag_string: string,
    tag_count: number,
    tag_count_general: number,
    tag_count_artist: number,
    tag_count_character: number,
    tag_count_copyright: number,
    file_ext: string,
    file_size: number,
    image_width: number,
    image_height: number,
    parent_id: number | null,
    has_children: boolean,
    is_banned: boolean,
    pixiv_id: number | null,
    last_commented_at: any,
    has_active_children: boolean,
    bit_flags: number,
    tag_count_meta: number,
    has_large: boolean,
    has_visible_children: boolean,
    tag_string_general: string,
    tag_string_character: string,
    tag_string_copyright: string,
    tag_string_artist: string,
    tag_string_meta: string,
    file_url: string,
    large_file_url: string,
    preview_file_url: string,
}

export type DanbooruPosts = DanbooruImage[];

interface DanbooruAutocomplete {
    type: string,
    label: string,
    value: string,
    category: number,
    post_count: number,
    antecedent: string | null,
}

export type DanbooruAutocompleteResponse = DanbooruAutocomplete[];
