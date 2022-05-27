import React from "react";
import { useState, useEffect } from "react";
import BackendCaller from "../Api/BackendCaller";
import Comments from "./Comments";
function CustomFeed({ category }) {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (category == "Home") return;
        const name = category;
        console.log(name);
        const data = await BackendCaller.get(`/posts/${name}/posts`, {
          withCredentials: true,
        });
        console.log(data.data);
        setPosts(data.data);
      } catch (error) {
        console.log(error.message);
      }
      // console.log("posts", posts);
    };
    fetchData();
  }, [category, like, dislike]);
  async function handleLike(identifier, slug) {
    // console.log("like");
    const res = await BackendCaller.post(`/posts/${identifier}/${slug}/like`);
    setLike(like + 1);
    // console.log(res);
  }
  async function handleDislike(identifier, slug) {
    // console.log("dislike");
    setDislike(dislike + 1);
    const res = await BackendCaller.post(
      `/posts/${identifier}/${slug}/dislike`
    );
    // console.log(res);
  }
  return (
    <>
      {posts &&
        posts.map((post) => {
          return (
            <div className="w-full pt-4 text-[#fff] border-b py-8 my-2 rounded-md">
              <div className="flex justify-between">
                <h3 className="font-bold">{post.title}</h3>
                <span className="font-bold">
                  Posted by:&nbsp;{post.username}
                </span>
                <span className="font-bold">Category:&nbsp;{post.subName}</span>
              </div>
              <div className="">
                <p>{post.body}</p>
              </div>
              <div className="flex justify-between mt-2">
                <div className="flex justify-between w-40">
                  <div className="w-20 py-1 mr-4 leading-5 rounded-full blue button">
                    <button
                      onClick={(e) => handleLike(post.identifier, post.slug)}
                    >
                      <span className="font-bold">likes:{post.likes}</span>
                    </button>
                  </div>
                  <div className="w-20 py-1 mr-4 leading-5 rounded-full blue button">
                    <button
                      onClick={(e) => handleDislike(post.identifier, post.slug)}
                    >
                      <span className="font-bold">
                        dislikes:{post.dislikes}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="font-bold">{post.slug}</div>
                <div className="w-32 py-1 mr-4 leading-5 hollow blue button">
                  <button
                    onClick={(e) =>
                      comments === post.identifier
                        ? setComments("")
                        : setComments(post.identifier)
                    }
                  >
                    Comments
                  </button>
                </div>
              </div>
              {comments === post.identifier && (
                <Comments identifier={post.identifier} slug={post.slug} />
              )}
            </div>
          );
        })}
      {posts.length === 0 && (
        <h1 className="text-[white] text-center">No Posts to Display</h1>
      )}
    </>
  );
}

export default CustomFeed;
