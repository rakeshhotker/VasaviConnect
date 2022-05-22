import React, { useEffect, useState } from "react";
import BackendCaller from "../Api/BackendCaller";
import SidebarOption from "./SidebarOption";
function Sidebar({ categories, setCategories }) {
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
  return (
    <>
      <div className="flex-col justify-evenly w-4/20 h-full px-5 text-[#fff]">
        {categories &&
          categories.map((category) => {
            return <SidebarOption text={category.name} />;
          })}
      </div>
    </>
  );
}

export default Sidebar;
