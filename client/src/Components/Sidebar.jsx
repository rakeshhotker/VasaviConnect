import React from "react";
import SidebarOption from "./SidebarOption";
function Sidebar() {
  return (
    <>
      <div className="flex-col justify-evenly w-4/20 h-full px-5 text-[#fff]">
        <SidebarOption active text="Home" />
        <SidebarOption text="Placement"/>
        <SidebarOption text="Competitive Programming" />
        <SidebarOption text="Sports" />
        <SidebarOption text="App Development" />
        <SidebarOption text="Web Development" />
      </div>
    </>
  );
}

export default Sidebar;
