import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_API_ENDPOINT, TYPES_API_ENDPOINT } from '../constants/api';
import { GetAPI, PostTypeAPI } from '../interfaces/api';
import { Post } from '../interfaces/post';
import { PostCard } from './PostCard';
import { MultiSelect, Option } from 'react-multi-select-component';

export function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [pagesCount, setPagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [options, setOptions] = useState<Option[]>([]);
    const [filterType, setFilterType] = useState<Option[]>([]);
    const [filterDate, setFilterDate] = useState('DESC');

    useEffect(() => {
        async function getPosts() {
            const type = filterType.map((t) => t.label).join(',');
            const res = await axios.get(BASE_API_ENDPOINT, {
                params: { page: currentPage, type, order: filterDate },
            });
            const data = res.data as GetAPI;
            setPosts(data.posts);
            setPagesCount(data.pages);
        }

        getPosts();
    }, [currentPage, filterType, filterDate]);

    useEffect(() => {
        async function getTypes() {
            const res = await axios.get(TYPES_API_ENDPOINT);
            const data = res.data as PostTypeAPI;
            const options = data.types.map(({ name }) => ({
                label: name,
                value: name,
            }));

            setOptions(options);
        }

        getTypes();
    }, []);

    const isPaginationButtonsDisabled = !pagesCount;
    const isPrevDisabled = currentPage == 1 || isPaginationButtonsDisabled;
    const isNextDisabled =
        currentPage >= pagesCount || isPaginationButtonsDisabled;

    return (
        <div className="space-y-5 mt-5">
            <section className="flex gap-7">
                <div>
                    Filter by:
                    <MultiSelect
                        className="mt-2 min-w-[150px]"
                        labelledBy="type filters"
                        options={options}
                        value={filterType}
                        onChange={setFilterType}
                    />
                </div>
                <div>
                    <p>Order date by:</p>
                    <select
                        className="border border-black mt-2 rounded p-1"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    >
                        <option value="ASC">ASC</option>
                        <option value="DESC">DESC</option>
                    </select>
                </div>
            </section>

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
