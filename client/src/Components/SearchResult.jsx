import React from "react";

function SearchResult({ searchResult }) {
  console.log(searchResult);
  return (
    <>
      <div className="z-10 flex justify-around">
        <div>{searchResult.body}</div>
        <div>{searchResult.title}</div>
        <div>{searchResult.username}</div>
      </div>
    </>
  );
}

export default SearchResult;
