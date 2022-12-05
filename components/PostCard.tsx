import React from 'react';
import { dateFormatter } from '../helpers/date';
import { Post } from '../interfaces/post';

interface PropsInterface {
    post: Post;
}

export function PostCard({ post }: PropsInterface) {
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
