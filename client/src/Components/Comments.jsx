import React, { useEffect, useState } from "react";
import BackendCaller from "../Api/BackendCaller";

function Comments({ identifier, slug }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [getComments, setgetComments] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await BackendCaller.get(
          `/posts/${identifier}/${slug}/comments`,
          {
            withCredentials: true,
          }
        );
        // console.log(res.data);
        setComments(res.data);
        // console.log("comments", comments);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [getComments]);
  async function handleCommenting() {
    await BackendCaller.post(
      `/posts/${identifier}/${slug}/comments`,
      {
        body: comment,
      },
      {
        withCredentials: true,
      }
    );
    setgetComments(!getComments);
    setComment("");
  }
  return (
    <>
      <label>Comment:</label>
      <input
        type="text"
        placeholder="write your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full ml-5 text-center outline-none text-2xl bg-black border-0 h-35 text-[#fff] mr-4"
      />
      <button
        className="w-20 h-10 mt-5 ml-auto bg-purple-600 border-0 rounded-3xl"
        onClick={handleCommenting}
      >
        comment
      </button>
      <div className="w-full h-full">
        {comments.length === 0 && <h3>No comments to display</h3>}
        {comments &&
          comments.map((comment) => {
            return (
              <>
                <div className="w-100 h-28">
                  <div>
                    {comment.username}
                    {comment.createdAt}
                  </div>
                  <div>{comment.body}</div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

export default Comments;
