import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Route Props
export type RootStackParamList = {
    Menu: undefined,
    Gallery: { searchText: string, site: Site },
};

export type MainMenuNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Menu'
>;

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

// Danbooru autocomplete
interface DanbooruAutocomplete {
    type: string,
    label: string,
    value: string,
    category: number,
    post_count: number,
    antecedent: string | null,
}

// Yande.re
interface YandereImage {
    id: number;
    tags: string;
    created_at: number;
    updated_at: number;
    creator_id: number;
    approver_id?: any;
    author: string;
    change: number;
    source: string;
    score: number;
    md5: string;
    file_size: number;
    file_ext: string;
    file_url: string;
    is_shown_in_index: boolean;
    preview_url: string;
    preview_width: number;
    preview_height: number;
    actual_preview_width: number;
    actual_preview_height: number;
    sample_url: string;
    sample_width: number;
    sample_height: number;
    sample_file_size: number;
    jpeg_url: string;
    jpeg_width: number;
    jpeg_height: number;
    jpeg_file_size: number;
    rating: string;
    is_rating_locked: boolean;
    has_children: boolean;
    parent_id?: any;
    status: string;
    is_pending: boolean;
    width: number;
    height: number;
    is_held: boolean;
    frames_pending_string: string;
    frames_pending: any[];
    frames_string: string;
    frames: any[];
    is_note_locked: boolean;
    last_noted_at: number;
    last_commented_at: number;
};

// Gelbooru
interface GelbooruImage {
    source: string;
    directory: string;
    hash: string;
    height: number;
    id: number;
    image: string;
    change: number;
    owner: string;
    parent_id?: any;
    rating: string;
    sample: number;
    preview_height: number;
    preview_width: number;
    sample_height: number;
    sample_width: number;
    score: number;
    tags: string;
    title: string;
    width: number;
    file_url: string;
    created_at: string;
    post_locked: number;
}

// Generics
export type GenericImage = {
    id: number,
    preview_url: string,
    file_url: string,
    large_file_url: string,
    source: string,
    tags: string,
    file_ext: string,
    md5?: string,
};

interface GelbooruAutocomplete {
    type: string,
    label: string,
    value: string,
    category: string,
    post_count: string,
}

export type GenericPosts = Array<DanbooruImage | YandereImage | GelbooruImage>;

// Supported websites
export type Site = "danbooru" | "yande.re" | "gelbooru";

export type AutocompleteResponse = Array<DanbooruAutocomplete | GelbooruAutocomplete>;
