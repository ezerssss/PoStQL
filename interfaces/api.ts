import { Post } from './post';

export interface PostAPI {
    msg: string;
}

export interface GetAPI {
    posts: Post[];
}

export interface PostType {
    post_type_id: number;
    name: string;
}

export interface PostTypeAPI {
    types: PostType[];
}
