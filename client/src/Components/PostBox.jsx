import React, { useState } from "react";
import "./postbox.css";
function PostBox() {
  const [post, setPost] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="w-full h-full pt-1 mr-10 bg-black border rounded-3xl">
        <form className="flex flex-col justify-center">
          <div className="flex w-full h-40 pl-5 rounded-3xl">
            <textarea
              value={post}
              placeholder="What's on your mind!"
              onChange={(e) => setPost(e.target.value)}
              className=" w-full ml-5 text-center outline-none text-2xl bg-black border-0 h-35 text-[#fff] mr-4"
            />
          </div>
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
