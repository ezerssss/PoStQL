import React, { useEffect, useState } from 'react';
import { PostType, PostTypeAPI } from '../interfaces/api';
import { NewPost } from '../interfaces/post';
import axios from 'axios';
import { BASE_API_ENDPOINT, TYPES_API_ENDPOINT } from '../constants/api';

const initialState: NewPost = {
    content: '',
    post_type_id: 1,
};

export function CreatePost() {
    const [isHidden, setIsHidden] = useState(true);
    const [newPost, setNewPost] = useState(initialState);
    const [postTypes, setPostTypes] = useState<PostType[]>([]);

    function handleToggleCreatePost() {
        setIsHidden((prev) => !prev);
    }

    async function handleSubmitPost() {
        try {
            await axios.post(BASE_API_ENDPOINT, {
                content: newPost.content,
                post_type_id: newPost.post_type_id,
            });
        } catch (error) {
            console.error(error);
        }
    }

    function handleOnSubmit(e: React.FormEvent) {
        e.preventDefault();

        handleToggleCreatePost();
        handleSubmitPost();
        setNewPost(initialState);
    }

    function handleOnChange(
        e:
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>,
    ) {
        const { name, value } = e.target;
        setNewPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    useEffect(() => {
        async function getTypes() {
            const res = await axios.get(TYPES_API_ENDPOINT);
            const data = res.data as PostTypeAPI;

            setPostTypes(data.types);
        }

        getTypes();
    }, []);

    const isPostButtonDisabled = !newPost.content.trim() || !postTypes;

    return (
        <>
            <button
                className="w-full p-3 bg-gray-200 rounded-xl"
                onClick={handleToggleCreatePost}
            >
                Create post
            </button>
            <div
                className={`${
                    isHidden && 'hidden'
                } relative m-auto mt-5 w-80 max-w-[95%] bg-gray-100 p-5 rounded-xl border-2`}
            >
                <h2 className="font-bold text-lg mb-2">Create post</h2>
                <button
                    className="absolute bg-red-200 w-6 h-6 rounded-full top-3 right-3 flex items-center justify-center"
                    onClick={handleToggleCreatePost}
                />
                <form onSubmit={handleOnSubmit}>
                    <select
                        className="p-1 rounded-xl outline-none border"
                        name="post_type_id"
                        value={newPost.post_type_id}
                        onChange={handleOnChange}
                    >
                        {postTypes.map(({ post_type_id, name }) => (
                            <option value={post_type_id} key={name}>
                                {name}
                            </option>
                        ))}
                    </select>

                    <textarea
                        name="content"
                        onChange={handleOnChange}
                        value={newPost.content}
                        placeholder="Write something to post..."
                        className="h-40 w-full outline-0 border bg-transparent rounded-md p-2 mt-5"
                    />

                    <button
                        className="w-full py-2 bg-green-400 disabled:bg-slate-300 mt-4 rounded-xl"
                        type="submit"
                        disabled={isPostButtonDisabled}
                    >
                        Post
                    </button>
                </form>
            </div>
        </>
    );
}
