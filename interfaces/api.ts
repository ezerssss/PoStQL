import { Post } from './post';

export interface PostAPI {
    msg: string;
}

export interface GetAPI {
    posts: Post[];
    pages: number;
}

export interface PostType {
    post_type_id: number;
    name: string;
}

export interface PostTypeAPI {
    types: PostType[];
}

export interface RowCount {
    count: number;
}
