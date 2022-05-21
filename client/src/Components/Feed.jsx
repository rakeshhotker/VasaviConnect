import React, { useEffect, useState } from "react";
import BackendCaller from "../Api/BackendCaller";
import Comments from "./Comments";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [sub, setSub] = useState("");
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await BackendCaller.post(
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
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await BackendCaller.get("/posts");
        // console.log(data.data);
        setPosts(data.data);
      } catch (error) {
        console.log(error.message);
      }
      // console.log("posts", posts);
    };
    fetchData();
  }, [post, like, dislike]);
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
                  <button>Comments</button>
                </div>
              </div>
              <Comments identifier={post.identifier} slug={post.slug} />
            </div>
          );
        })}
    </>
  );
}

export default Feed;
