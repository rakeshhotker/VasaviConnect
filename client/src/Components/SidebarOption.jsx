import React from "react";
import "./sidebaroption.css";
function SidebarOption({ active, text }) {
  return (
    <>
      <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
        <h3>{text}</h3>
      </div>
    </>
  );
}

export default SidebarOption;
