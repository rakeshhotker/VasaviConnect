import React, { useEffect, useState } from "react";
import BackendCaller from "../Api/BackendCaller";
import Comments from "./Comments";
function Feed({ categories }) {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [sub, setSub] = useState("");
  const [like, setLike] = useState("");
  const [dislike, setDislike] = useState("");
  const [comments, setComments] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await BackendCaller.post(
        "/posts",
        {
          title,
          body: post,
          sub,
        },
        { withCredentials: true }
      );

      setPost("");
      setTitle("");
    } catch (error) {
      console.log(error);
      setPost(error.response.data);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await BackendCaller.get("/posts");
        console.log(data.data);
        setPosts(data.data);
      } catch (error) {
        console.log(error.message);
      }
      // console.log("posts", posts);
    };
    fetchData();
  }, [post, like, dislike]);
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
  // console.log("categories", categories);
  return (
    <>
      <div className="w-full h-full pt-1 bg-black border">
        <form className="flex flex-col justify-center">
          <input
            type="text"
            placeholder="Enter the title of the post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" w-initial text-center outline-none text-2xl bg-black border-0 h-35 text-[#fff]"
          />
          <div className="flex w-full h-40 pl-5 mt-2 rounded-3xl">
            <textarea
              value={post}
              placeholder="What's on your mind!"
              onChange={(e) => setPost(e.target.value)}
              className=" w-full ml-5 outline-none text-2xl bg-black border-0 h-35 text-[#fff] text-center"
            />
          </div>
          <label>Category</label>
          <select
            className="w-initial text-center outline-none text-2xl bg-black border-0 h-35 text-[#fff]"
            onChange={(e) => setSub(e.target.value)}
          >
            <option value="">select a category</option>
            {categories &&
              categories.map((category) => {
                return <option value={category.name}>{category.name}</option>;
              })}
          </select>
          <button
            className="w-20 h-10 mt-5 ml-auto bg-purple-600 border-0 rounded-3xl"
            onClick={handleSubmit}
          >
            post
          </button>
        </form>
      </div>
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
    </>
  );
}

export default Feed;
