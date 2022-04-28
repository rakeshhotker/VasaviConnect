import React, { useEffect, useState } from "react";
import BackendCaller from "../Api/BackendCaller";
import PostBox from "./PostBox";
import Sidebar from "./Sidebar";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    BackendCaller.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="flex mt-20">
        <Sidebar />
        <PostBox />
      </div>
    </>
  );
}

export default Home;
