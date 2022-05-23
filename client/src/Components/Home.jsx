import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import CustomFeed from "./CustomFeed";
function Home() {
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   BackendCaller.get("/posts")
  //     .then((res) => setPosts(res.data))
  //     .catch((err) => console.log(err));
  // }, []);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("Home");
  // if (category == "Home" && home) {
  //   setHome(true);
  // } else {
  //   setHome(false);
  // }
  return (
    <>
      <div className="flex mt-20">
        <Sidebar
          categories={categories}
          setCategories={setCategories}
          category={category}
          setCategory={setCategory}
        />
        <div className="flex flex-col items-center justify-around w-3/5 h-full pl-10 border-l-2">
          {/* <PostBox /> */}
          <div className="w-full py-3">
            {category == "Home" && (
              <Feed categories={categories} setCategories={setCategories} />
            )}
            <CustomFeed category={category} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
