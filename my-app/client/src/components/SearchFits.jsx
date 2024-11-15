import React from "react";

const SearchFits = () => {
  return (
    <div className="flex flex-col space-y-2 ">
      <input
        className="bg-white text-black text-center p-2 ring-1  hover:ring-red-300 outline-none"
        id="name"
        type="text"
        placeholder="Search by name"
      ></input>
      <button className="bg-electric-indigo p-2">Filters</button>
    </div>
  );
};

export default SearchFits;
