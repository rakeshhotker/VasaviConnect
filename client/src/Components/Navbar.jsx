import React, { useEffect, useState } from "react";
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
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // function setSearchResult(results) {
  //   var n = 0;
  //   results.length > 5 ? (n = 5) : (n = results.length);
  //   for (var i = 0; i < n; i++) {
  //     searchResult[i] = results[i];
  //   }
  // }
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
  const searchQuery = async (e) => {
    e.preventDefault();
    console.log(query);
    try {
      if (query === "") {
        setQuery("Query can't be empty");
        setSearchResult([]);
        return;
      }
      const res = await BackendCaller.get(`posts/${query}/search`);
      setSearchResult(res.data);
      console.log(searchResult);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isLoggedIn && (
        <div className="fixed inset-x-0 top-0 z-10 flex items-center h-12 bg-[#28282B] w-full justify-between">
          <div className="flex items-center">
            <img src={Logo} className="w-8 h-8" />
            <span className="text-2xl font-semibold text-[#fff]">
              VasaviConnect
            </span>
          </div>
          <div className="flex flex-col justify-between w-3/5">
            <div className="relative mt-2 flex bg-[#28282B] border rounded hover:border-blue-500  justify-between">
              <div>
                <input
                  style={{ width: "50vw" }}
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  type="text"
                  placeholder="Search for Post"
                  className="py-1 bg-transparent rounded focus:outline-none text-[#fff] text-center "
                />
              </div>
              <div>
                <button
                  onClick={searchQuery}
                  className="w-16 py-1 mr-1 leading-5 rounded-full blue button"
                >
                  Search
                </button>
              </div>
            </div>
            {query && (
              <div
                style={{ zIndex: "100" }}
                className="absolute w-3/5 mt-10 bg-[#28282B] text-[white] border rounded overflow-auto h-64"
              >
                {searchResult &&
                  searchResult.map((result) => {
                    return (
                      <>
                        <div className="flex justify-around text-blue-500 border-b">
                          <p>
                            <strong>title:</strong>&nbsp;
                            <i>{result.title}</i>
                          </p>
                          <p>
                            <strong>body:</strong>&nbsp;<i>{result.body}</i>
                          </p>
                          <p>
                            <strong>username:</strong>&nbsp;
                            <i>{result.username}</i>
                          </p>
                        </div>
                      </>
                    );
                  })}
                {searchResult.length == 0 && (
                  <div className="w-3/5 mt-10 text-center">No Posts found</div>
                )}
              </div>
            )}
          </div>
          <div className="flex">
            <button
              className="w-16 py-1 mr-4 leading-5 hollow blue button "
              onClick={handleLogout}
            >
              logout
            </button>
            {profile ? (
              <button
                onClick={(e) => setProfile(!profile)}
                className="w-16 py-1 mr-4 leading-5 rounded-full blue button"
              >
                HOME
              </button>
            ) : (
              <button
                onClick={(e) => setProfile(!profile)}
                className="w-32 py-1 mr-1 leading-5 rounded-full blue button"
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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search for Post"
              className="py-1 pr-3 bg-transparent rounded w-90 focus:outline-none text-[#fff] text-center"
            />
            <input
              type="submit"
              value="search"
              className="w-16 py-1 leading-5 rounded-full blue button"
              onClick={searchQuery}
            />
          </div>
          <div className="flex">
            <button
              className="w-16 py-1 mr-4 leading-5 hollow blue button "
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
