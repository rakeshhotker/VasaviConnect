import React, { useState } from "react";
import BackendCaller from "../Api/BackendCaller";
import "./postbox.css";
function PostBox() {
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [sub, setSub] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(post, title, sub);
    try {
      await BackendCaller.post(
        "/posts",
        {
          title,
          post,
          sub,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full h-full pt-1 mr-10 bg-black border rounded-3xl">
        <form className="flex flex-col justify-center">
          <label>Title:</label>
          <input
            type="text"
            placeholder="enter the title of the post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" w-full ml-5 text-center outline-none text-2xl bg-black border-0 h-35 text-[#fff] mr-4"
          />
          <div className="flex w-full h-40 pl-5 rounded-3xl">
            <textarea
              value={post}
              placeholder="What's on your mind!"
              onChange={(e) => setPost(e.target.value)}
              className=" w-full ml-5 text-center outline-none text-2xl bg-black border-0 h-35 text-[#fff] mr-4"
            />
          </div>
          <label>Category</label>
          <select
            className=" w-full ml-5 text-center outline-none text-2xl bg-black border-0 h-35 text-[#fff] mr-4"
            onChange={(e) => setSub(e.target.value)}
          >
            <option value="Home">Home</option>
            <option value="Placement">Placement</option>
            <option value="Competitive Programming">
              Competitive Programming
            </option>
            <option value="Sports">Sports</option>
            <option value="App Development">App Development</option>
            <option value="celebration">celebration</option>
          </select>
          <button
            className="w-20 h-10 mt-5 ml-auto bg-purple-600 border-0 rounded-3xl"
            onClick={handleSubmit}
          >
            post
          </button>
        </form>
      </div>
    </>
  );
}

export default PostBox;
