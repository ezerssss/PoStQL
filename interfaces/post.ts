interface BasePost {
    content: string;
}

export interface Post extends BasePost {
    type: string;
    date: Date;
}

export interface NewPost extends BasePost {
    post_type_id: number;
}
