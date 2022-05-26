import React, { useState } from "react";
import BackendCaller from "../Api/BackendCaller";

function Profile() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleCategoryCreation = async (e) => {
    e.preventDefault();
    try {
      const res = await BackendCaller.post(
        "/subs",
        {
          name,
          title,
          description,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mt-20 text-[white]">
        <div>
          <div>
            <h1>Name:</h1>
            <input
              className="bg-black "
              type="text"
              value={name}
              placeholder="Enter Name of the Category"
              required
              spellCheck
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <h1>Title:</h1>
            <input
              className="text-[white] bg-black"
              type="text"
              value={title}
              placeholder="Enter Title of the Category"
              required
              spellCheck
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <h1>Description:</h1>
            <input
              className="text-[white] bg-black"
              type="text"
              value={description}
              placeholder="Enter Description of the Category"
              required
              spellCheck
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            className="w-20 h-10 mt-5 ml-auto bg-purple-600 border-0 rounded-3xl"
            onClick={handleCategoryCreation}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
