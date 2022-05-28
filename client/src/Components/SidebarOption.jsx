import React from "react";
// import "./sidebaroption.css";
function SidebarOption({ active, text, setCategory }) {
  return (
    <>
      <div className="mb-3 text-xl font-bold cursor-pointer w-96 px-py hover:bg-blue-600">
        <button onClick={(e) => setCategory(e.target.value)} value={text}>
          {text}
        </button>
      </div>
    </>
  );
}

export default SidebarOption;
