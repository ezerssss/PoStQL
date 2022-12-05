import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_API_ENDPOINT } from '../constants/api';
import { GetAPI } from '../interfaces/api';
import { Post } from '../interfaces/post';
import { PostCard } from './PostCard';

export function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [pagesCount, setPagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function getPosts() {
            const res = await axios.get(BASE_API_ENDPOINT, {
                params: { page: currentPage },
            });
            const data = res.data as GetAPI;
            setPosts(data.posts);
            setPagesCount(data.pages);
        }

        getPosts();
    }, [currentPage]);

    const isPaginationButtonsDisabled = !pagesCount;
    const isPrevDisabled = currentPage == 1 || isPaginationButtonsDisabled;
    const isNextDisabled =
        currentPage >= pagesCount || isPaginationButtonsDisabled;

    return (
        <div className=" space-y-5 mt-5">
            {posts.map((post, index) => (
                <PostCard key={`${post.date}${index}`} post={post} />
            ))}

            <div className="flex gap-4">
                <button
                    className="disabled:text-gray-400"
                    disabled={isPrevDisabled}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Prev
                </button>
                <button
                    className="disabled:text-gray-400"
                    disabled={isNextDisabled}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
