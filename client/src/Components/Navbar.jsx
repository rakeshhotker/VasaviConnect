import React, { useState } from "react";
import Logo from "../Assets/Logo.jpeg";
import BackendCaller from "../Api/BackendCaller";
function Navbar({
  setisLoggedIn,
  isLoggedIn,
  authenticate,
  setisAuthenticate,
  profile,
  setProfile,
}) {
  const [slug, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState({});
  var wantToLogin = false;
  function handleLogout(e) {
    e.preventDefault();
    if (isLoggedIn) {
      setisLoggedIn(!isLoggedIn);
    }
  }
  function handleAuth(e) {
    e.preventDefault();
    setisAuthenticate(!authenticate);
  }
  async function searchQuery(e) {
    console.log(slug);
    e.preventDefault();
    try {
      const res = await BackendCaller.get(`posts/${slug}/search`);
      setSearchResult(res);
      console.log(res);
      setQuery("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {isLoggedIn && (
        <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 bg-[#28282B]">
          <div className="flex items-center">
            <img src={Logo} className="w-8 h-8 mr-2" />
            <span className="text-2xl font-semibold text-[#fff]">
              VasaviConnect
            </span>
          </div>
          <div className="flex items-center mx-auto bg-[#28282B] border rounded hover:border-blue-500">
            <input
              onChange={(e) => setQuery(e.target.value)}
              value={slug}
              type="text"
              placeholder="Search for Post"
              className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none text-[#fff] text-center"
            />
            <input
              type="submit"
              value="search"
              className="w-32 py-1 mr-4 leading-5 rounded-full blue button"
              onClick={searchQuery}
            />
          </div>
          <div className="flex">
            <button
              className="w-32 py-1 mr-4 leading-5 hollow blue button "
              onClick={handleLogout}
            >
              logout
            </button>
            {profile ? (
              <button
                onClick={(e) => setProfile(!profile)}
                className="w-32 py-1 mr-4 leading-5 rounded-full blue button"
              >
                HOME
              </button>
            ) : (
              <button
                onClick={(e) => setProfile(!profile)}
                className="w-32 py-1 mr-4 leading-5 rounded-full blue button"
              >
                MyProfile
              </button>
            )}
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 bg-[#28282B]">
          <div className="flex items-center">
            <img src={Logo} className="w-10 h-10 ml-4" />
            <span className="text-2xl font-semibold text-[#fff]">
              VasaviConnect
            </span>
          </div>
          <div className="flex items-center mx-auto bg-[#28282B] border rounded hover:border-blue-500 ">
            <input
              value={slug}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search for Post"
              className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none text-[#fff] text-center"
            />
            <input
              type="submit"
              value="search"
              className="w-32 py-1 mr-4 leading-5 rounded-full blue button"
              onClick={searchQuery}
            />
          </div>
          <div className="flex">
            <button
              className="w-32 py-1 mr-4 leading-5 hollow blue button "
              onClick={handleAuth}
            >
              GetIn
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
