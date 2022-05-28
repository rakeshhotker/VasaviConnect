import React, { useEffect, useState } from "react";
import BackendCaller from "../Api/BackendCaller";
import Comments from "./Comments";
import Userpic from "../Assets/user.png";
function Profile({ user }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [comments, setComments] = useState("");
  const handleCategoryCreation = async (e) => {
    e.preventDefault();
    try {
      const res = await BackendCaller.post(
        "/subs",
        {
          name,
          title,
          description,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      var username = user;
      try {
        const data = await BackendCaller.get(`/posts/${username}/`);
        console.log(data.data);
        setPosts(data.data);
      } catch (error) {
        console.log(error.message);
      }
      // console.log("posts", posts);
    };
    fetchData();
  }, [like, dislike]);
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
      <div className="w-full mt-20 text-[white] flex ">
        <div className="w-2/6 px-5">
          <h1>Create a Category</h1>
          <div>
            <h1>Name:</h1>
            <input
              className="bg-black "
              type="text"
              value={name}
              placeholder="Enter Name of the Category"
              required
              spellCheck
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <h1>Title:</h1>
            <input
              className="text-[white] bg-black"
              type="text"
              value={title}
              placeholder="Enter Title of the Category"
              required
              spellCheck
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <h1>Description:</h1>
            <input
              className="text-[white] bg-black"
              type="text"
              value={description}
              placeholder="Enter Description of the Category"
              required
              spellCheck
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            className="w-20 h-10 mt-5 ml-auto bg-purple-600 border-0 rounded-3xl"
            onClick={handleCategoryCreation}
          >
            Create
          </button>
        </div>
        <div className="w-3/5 pl-5 border-l-2">
          <div className="w-full">
            <div className="block text-center">
              <img
                src={Userpic}
                className="w-20 h-20 rounded-full border-zinc-900"
              />
              <p className="text-green-500 uppercase">{user}</p>
            </div>
          </div>
          <div>
            <h1 className="text-lg text-blue-500">Your Posts</h1>
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
                            onClick={(e) =>
                              handleLike(post.identifier, post.slug)
                            }
                          >
                            <span className="font-bold">
                              likes:{post.likes}
                            </span>
                          </button>
                        </div>
                        <div className="w-20 py-1 mr-4 leading-5 rounded-full blue button">
                          <button
                            onClick={(e) =>
                              handleDislike(post.identifier, post.slug)
                            }
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
                        <Comments
                          identifier={post.identifier}
                          slug={post.slug}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
