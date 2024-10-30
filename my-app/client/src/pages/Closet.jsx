import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SquareGrid from "../components/SquareGrid";

const Closet = () => {
  const [currentFilter, setFilter] = useState("All");
  const filterOptions = ["All", "Headwear", "Tops", "Bottoms", "Footwear"];
  const handleFilter = (filter) => {
    setFilter(filter);
  };
  return (
    <div className="page-background bg-medium-slate-blue ">
      <NavBar />
      <div className="bg-medium-slate-blue h-screen w-screen pl-8 pr-8 pb-8 mb-8 overflow-hidden">
        <main className="bg-blue-400 h-full p-4 flex flex-col space-y-3 text-center rounded drop-shadow-md">
          <header className="bg-yellow-600 p-2 ">
            <h2 className="text-3xl animate-fadeUp">Your Closet</h2>
          </header>
          <section
            className="clothing-options h-16 w-2/3 p-2 flex flex-row space-x-4
             items-center justify-evenly"
          >
            {filterOptions.map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => handleFilter(filterOption)}
                className={`p-2 w-1/5 h-12 text-lg rounded
                  drop-shadow-md
                  transition ease-in-out delay-50
                  hover:-translate-y-1 hover:scale-110
                  ${
                    currentFilter === filterOption
                      ? "bg-magnolia text-black"
                      : "bg-electric-indigo text-white"
                  } transition-colors duration-300`}
              >
                {filterOption}
              </button>
            ))}
          </section>
          <div
            className="filter-section 
          flex flex-row items-center justify-between px-2 py-4 h-12 "
          >
            <div className="space-x-4 ">
              <input
                type="text"
                placeholder="Search by name"
                className="p-2 text-black rounded w-42
                
                focus:outline-none focus:ring focus:ring-medium-slate-blue"
              />
              <button className="bg-electric-indigo h-12 w-24 rounded ">
                Filters
              </button>
              <button className="bg-electric-indigo h-12 w-24 rounded ">
                Sort by
              </button>
            </div>
            <button
              className="bg-yellow-500  h-12 w-24 rounded 
            "
            >
              Favorites
            </button>
          </div>
          <section
            className="closet-items 
          bg-stone-400 drop-shadow-lg rounded h-full p-4 overflow-y-auto"
          >
            <SquareGrid />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Closet;
