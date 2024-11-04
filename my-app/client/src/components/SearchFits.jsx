import React from "react";

const SearchFits = () => {
  return (
    <div className="flex flex-col space-y-2 ">
      <input
        className="bg-white text-center p-2"
        id="name"
        type="text"
        placeholder="Search by name!"
      ></input>
      <button className="bg-medium-slate-blue p-2">Filters</button>
    </div>
  );
};

export default SearchFits;
