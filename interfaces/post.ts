export interface NewPost {
    content: string;
    type: string;
}

export interface Post extends NewPost {
    date: Date;
}
