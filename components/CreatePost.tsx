import React, { useState } from "react";

type NewPost = {
  titleDescription: string;
  type: string;
};

const iniState = {
  titleDescription: "",
  type: "Life",
};

export const CreatePost = () => {
  const POST_TYPES = ["Life", "Job", "Joke", "Animals", "Food"];
  const [isHidden, setIsHidden] = useState(true);
  const [newPost, setNewPost] = useState<NewPost>(iniState);

  const isEmpty = (str: string) => {
    const length = str.trim().length;
    return length < 1;
  };

  const handleToggleCreatePost = () => {
    setIsHidden((prev) => !prev);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (isEmpty(newPost.titleDescription)) {
      return;
    }
    handleToggleCreatePost();
    //POST to DB
    //axios.post(url, {newPost})
    console.log(`Submitted ${JSON.stringify(newPost)}`);
    alert("Posted Successfully");

    //setStates back to initals
    setNewPost(iniState);
  };

  const handleOnChange = (e: any) => {
    const { name, value, style } = e.target;
    setNewPost((prev: NewPost) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className=" bg-gray-100 p-5">
      <button className="w-full bg-blue-500" onClick={handleToggleCreatePost}>
        Create Post
      </button>

      <div
        className={` ${
          isHidden && "hidden"
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
            <select name="type" value={newPost.type} onChange={handleOnChange}>
              {POST_TYPES.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <textarea
              name="titleDescription"
              onChange={handleOnChange}
              value={newPost.titleDescription}
              placeholder="Write something to post..."
              className={`h-40 w-full outline-0 resize-y overflow-auto border bg-transparent rounded-md`}
            ></textarea>
          </div>

          <button
            className=" w-full bg-blue-500 disabled:bg-slate-300 disabled:cursor-not-allowed"
            type="submit"
            disabled={isEmpty(newPost.titleDescription)}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};
