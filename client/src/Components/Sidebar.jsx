import React from "react";
import SidebarOption from "./SidebarOption";
function Sidebar() {
  return (
    <>
      <div className="flex-col justify-around w-4/12 h-full px-5 text-[#fff]">
        <SidebarOption active text="Home" />
        <SidebarOption text="Competitive Programming" />
        <SidebarOption text="Competitive Programming" />
        <SidebarOption text="Competitive Programming" />
        <SidebarOption text="Competitive Programming" />
        <SidebarOption text="Competitive Programming" />
      </div>
    </>
  );
}

export default Sidebar;
