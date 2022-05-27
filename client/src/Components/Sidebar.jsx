import React, { useEffect, useState } from "react";
import BackendCaller from "../Api/BackendCaller";
import SidebarOption from "./SidebarOption";
function Sidebar({ categories, setCategories, category, setCategory }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await BackendCaller.get("/subs", {
          withCredentials: true,
        });
        setCategories(res.data);
        console.log(categories);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  // console.log("burh", categories);

  return (
    <>
      <div className="flex-col justify-evenly w-4/20 h-full px-5 text-[#fff]">
        <div className="mb-3 text-xl font-bold cursor-pointer w-96 px-py hover:bg-blue-600 ">
          <button onClick={(e) => setCategory(e.target.value)} value="Home">
            Home
          </button>
        </div>
        {categories &&
          categories.map((category, index) => {
            return (
              <SidebarOption
                key={index}
                text={category.name}
                setCategory={setCategory}
              />
            );
          })}
      </div>
    </>
  );
}

export default Sidebar;
