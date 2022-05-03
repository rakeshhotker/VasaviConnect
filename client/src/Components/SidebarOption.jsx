import React from "react";
// import "./sidebaroption.css";
function SidebarOption({ active, text }) {
  return (
    <>
      <div className="w-96 px-py text-xl font-bold mb-3 hover:bg-blue-600">
        <h3>{text}</h3>
      </div>
    </>
  );
}

export default SidebarOption;
