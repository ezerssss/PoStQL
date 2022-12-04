import React, { useState } from 'react';
import { POST_TYPES } from '../constants/constant';
import { NewPost } from '../interfaces/interface';

const initialState: NewPost = {
    text: '',
    type: 'Life',
};

export function CreatePost() {
    const [isHidden, setIsHidden] = useState(true);
    const [newPost, setNewPost] = useState(initialState);
    const postTypes = POST_TYPES;

    function handleToggleCreatePost() {
        setIsHidden((prev) => !prev);
    }

    function handleOnSubmit(e: React.FormEvent) {
        e.preventDefault();
        handleToggleCreatePost();
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

    return (
        <div className=" bg-gray-100 p-5">
            <button
                className="w-full bg-blue-500"
                onClick={handleToggleCreatePost}
            >
                Create Post
            </button>

            <div
                className={` ${
                    isHidden && 'hidden'
                } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-gray-100 p-5 sm:w-96`}
            >
                <form onSubmit={handleOnSubmit}>
                    <div className=" text-center relative">
                        <div
                            className=" cursor-pointer absolute left-full -translate-x-full bg-blue-500 w-8 h-8 rounded-full"
                            onClick={handleToggleCreatePost}
                        >
                            x
                        </div>
                        <h1 className=" font-bold text-lg">CreatePost</h1>
                    </div>
                    <div>
                        <select
                            name="type"
                            value={newPost.type}
                            onChange={handleOnChange}
                        >
                            {postTypes.map((type) => (
                                <option value={type} key={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <textarea
                            name="text"
                            onChange={handleOnChange}
                            value={newPost.text}
                            placeholder="Write something to post..."
                            className={`h-40 w-full outline-0 resize-y overflow-auto border bg-transparent rounded-md`}
                        ></textarea>
                    </div>

                    <button
                        className=" w-full bg-blue-500 disabled:bg-slate-300 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={!newPost.text.trim()}
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
}
