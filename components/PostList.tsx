import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_API_ENDPOINT } from '../constants/api';
import { GetAPI } from '../interfaces/api';
import { Post } from '../interfaces/post';
import { PostCard } from './PostCard';

export function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        async function getPosts() {
            const res = await axios.get(BASE_API_ENDPOINT);
            const data = res.data as GetAPI;
            setPosts(data.posts);
        }
        getPosts();
    }, []);

    return (
        <div className=" space-y-5 mt-5">
            {posts.map((post, index) => (
                <PostCard key={`${post.date}${index}`} post={post} />
            ))}
        </div>
    );
}
