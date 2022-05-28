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
    if (like === identifier) {
      await BackendCaller.post(`/posts/${identifier}/${slug}/like1`);
      setLike("");
    }
    // console.log("like");
    if (dislike === identifier) {
      await BackendCaller.post(`/posts/${identifier}/${slug}/dislike1`);
      setDislike("");
    }
    if (like === "" || like != identifier) {
      await BackendCaller.post(`/posts/${identifier}/${slug}/like`);
      setLike(identifier);
    }
    // console.log(res);
  }
  async function handleDislike(identifier, slug) {
    // console.log("dislike");
    if (like === identifier) {
      await BackendCaller.post(`/posts/${identifier}/${slug}/like1`);
      setLike("");
    }
    if (dislike === identifier) {
      await BackendCaller.post(`/posts/${identifier}/${slug}/dislike1`);
      setDislike("");
    }
    if (dislike === "" || dislike != identifier) {
      await BackendCaller.post(`/posts/${identifier}/${slug}/dislike`);
      setDislike(identifier);
    }
    // console.log(res);
  }
  return (
    <>
      {posts &&
        posts.map((post) => {
          return (
            <div className="w-full pt-4 text-[#fff] border-b py-8 my-2 rounded-md">
              <div className="flex justify-between">
                <h3 className="font-bold uppercase">
                  <span className="text-blue-500">Title:</span>&nbsp;
                  {post.title}
                </h3>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">
                  <span className="text-blue-500">Posted by</span>:&nbsp;
                  {post.username}
                </span>
                <span className="font-bold uppercase">
                  <span className="text-blue-500">Category</span>:&nbsp;
                  {post.subname}
                </span>
              </div>
              <div className="mt-2">
                <p>{post.body}</p>
              </div>
              <div className="flex justify-between mt-5">
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
                {/* <div className="font-bold">{post.slug}</div> */}
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
              <div className="mt-4">
                {comments === post.identifier && (
                  <Comments identifier={post.identifier} slug={post.slug} />
                )}
              </div>
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
