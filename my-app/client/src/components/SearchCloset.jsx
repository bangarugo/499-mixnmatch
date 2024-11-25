import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

const SearchCloset = () => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  const filterOptions = ["Recently Added", "Size", "Colors"];
  const [currentFilter, setFilter] = useState("");
  const handleSetFilter = (filter) => {
    setFilter(filter);
  };

  return (
    <div className="flex flex-col  relative gap-y-2">
      <input
        className="bg-white text-black text-center p-2 ring-1 hover:ring-red-300 outline-none"
        id="search-bar"
        type="text"
        placeholder="Search by name"
      ></input>

      <button
        onClick={toggleFilterMenu}
        className="bg-electric-indigo p-2 relative z-10 flex flex-row justify-center items-center  gap-x-4 "
      >
        Filters
        {showFilterMenu ? (
          <ChevronUpIcon className="size-6" />
        ) : (
          <ChevronDownIcon className="size-6" />
        )}
      </button>

      {showFilterMenu && (
        <motion.div
          className="js-filter-options bg-gray-100 flex flex-col justify-center items-center absolute p-2 rounded shadow-md top-full z-20 gap-y-1 w-full"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          {filterOptions.map((filter) => (
            <button
              className="text-black w-full py-2 hover:bg-gray-300"
              onClick={() => {
                handleSetFilter(filter);
                console.log(currentFilter);
              }}
            >
              {filter}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SearchCloset;