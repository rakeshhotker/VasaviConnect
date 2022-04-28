import React, { useEffect, useState } from "react";
import BackendCaller from "../Api/BackendCaller";

function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await BackendCaller.get("/posts");
        console.log(data.data);
        setPosts(data.data);
      } catch (error) {
        console.log(error.message);
      }
      console.log("posts", posts);
    };
    fetchData();
  }, []);
  return (
    <>
      {posts &&
        posts.map((post) => {
          return (
            <div className="w-full pt-4 text-[#fff] border-2 py-5 my-2 rounded-md">
              <div className="flex justify-between">
                <h3>{post.title}</h3>
                <span>{post.username}</span>
                <span>{post.subName}</span>
              </div>
              <div>
                <p>{post.body}</p>
              </div>
              <div className="flex justify-between">
                <div className="flex justify-between w-40">
                  <div>
                    <button>{post.likes}</button>
                  </div>
                  <div>
                    <button>{post.dislikes}</button>
                  </div>
                </div>

                <div>comments</div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Feed;
