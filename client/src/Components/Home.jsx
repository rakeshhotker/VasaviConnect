import React, { useEffect, useState } from "react";
import BackendCaller from "../Api/BackendCaller";
import PostBox from "./PostBox";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
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
        <div className="flex flex-col items-center justify-around w-3/5 h-full pl-10 border-l-2">
          <PostBox />
          <div className="w-full overflow-y-scroll">
            <Feed />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
