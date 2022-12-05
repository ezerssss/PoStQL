import React from 'react';
import { Post } from '../interfaces/post';

interface IPostProps {
    post: Post;
}

export function PostCard({ post }: IPostProps) {
    function dateFormatter(postDate: Date): string {
        const date = new Date(postDate);
        const dd = date.getDate();
        const mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();

        return `${mm < 10 ? '0' + mm : mm}/${dd < 10 ? '0' + dd : dd}/${yyyy}`;
    }

    return (
        <div className=" bg-gray-200 rounded-xl px-8 py-4">
            <div className=" text-center">
                <h2 className=" font-bold">{post.type}</h2>
                <p className=" font-thin text-gray-500 text-xs">
                    {dateFormatter(post.date)}
                </p>
            </div>
            <div className=" mt-5">
                <p>{post.content}</p>
            </div>
        </div>
    );
}
