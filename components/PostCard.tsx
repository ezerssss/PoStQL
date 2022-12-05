import React from 'react';
import { dateFormatter } from '../helpers/date';
import { Post } from '../interfaces/post';

interface PropsInterface {
    post: Post;
}

export function PostCard({ post }: PropsInterface) {
    return (
        <div className="bg-gray-200 rounded-xl p-4 border border-black">
            <div className="mb-5">
                <p>{post.content}</p>
            </div>
            <h2 className="font-bold">{post.type}</h2>
            <p className="font-thin text-gray-500 text-xs">
                {dateFormatter(post.date)}
            </p>
        </div>
    );
}
