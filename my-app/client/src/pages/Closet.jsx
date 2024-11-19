import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SquareGrid from "../components/SquareGridY";
import UploadModal from "../components/UploadModal";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const Closet = () => {
  const [currentCategory, setCategory] = useState("All");
  const categories = ["All", "Headwear", "Tops", "Bottoms", "Footwear"];
  const handleCategory = (category) => {
    setCategory(category);
  };

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="page-background min-h-screen bg-medium-slate-blue  ">
      <NavBar />
      <div className="bg-medium-slate-blue  h-screen w-screen pt-20 pl-2 pr-2 pb-2   overflow-hidden  ">
        <main className="bg-blue-200 h-full w-full px-4 flex flex-col gap-y-2 text-center rounded drop-shadow-md">
          <header className="font-bold pt-3 ">
            <h2 className="text-3xl ">Your Closet</h2>
          </header>
          <div className="bg-red-400 flex flex-row justify-between items-center px-4 w-full h-40">
            <div className="text-xl font-bold">Items</div>
            <div className="text-xl font-bold">Outfits</div>
          </div>

          <section
            className="clothing-options h-16 w-2/3 p-2 flex flex-row space-x-4
             items-center justify-evenly"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategory(category)}
                className={`p-2 w-1/5 h-12 text-lg rounded
                  drop-shadow-md
                  transition ease-in-out delay-50
                  hover:-translate-y-1 hover:scale-110
                  ${
                    currentCategory === category
                      ? "bg-magnolia text-black"
                      : "bg-electric-indigo text-white"
                  } transition-colors duration-300`}
              >
                {category}
              </button>
            ))}
          </section>
          <div className="filter-section relative flex flex-row items-center justify-between px-2 py-4 h-12 ">
            <div className="gap-x-4 flex justify-start  text-center  w-3/5  ">
              <input
                type="text"
                placeholder="Search by name"
                className="search-bar p-2 text-black rounded xl:w-1/3 
                focus:outline-none focus:ring focus:ring-medium-slate-blue"
              />

              <div className="flex ">
                <button
                  className=" bg-electric-indigo h-12 w-48 rounded
                 p-2 relative z-10 flex flex-row justify-center  gap-x-4 "
                  onClick={() => {
                    toggleFilterMenu();
                  }}
                >
                  Filters
                  {showFilterMenu ? (
                    <ChevronUpIcon className="size-6" />
                  ) : (
                    <ChevronDownIcon className="size-6" />
                  )}
                </button>
              </div>

              <button className="bg-electric-indigo h-12 w-48 rounded ">
                Sort by
              </button>
            </div>
            <button
              className="bg-yellow-500  h-12 w-36 rounded 
            "
            >
              Favorites
            </button>
          </div>
          <section className="closet-items-container bg-neutral-200 drop-shadow-lg rounded h-3/4 px-4">
            <div className=" inner-closet-container flex flex-col w-full h-full gap-y-1  ">
              <div className=" sticky-top-div bg-neutral-200 w-1/4 sticky top-0 flex text-center  text-xl font-bold py-4"></div>
              <div className="closet-grid-container bg-neutral-200 overflow-y-auto text-black">
                <SquareGrid />
                {/* use text-ellipsis for item names that don't fit if theyre too long! */}
              </div>
              <div className="sticky-bottom-div  sticky bottom-0 mt-4 py-2">
                <button
                  className=" add-item-button bg-green-300 h-12 w-36 text-lg font-bold rounded
                  transition ease-in-out delay-50
                  hover:-translate-y-1 hover:scale-110"
                  onClick={toggleModal}
                >
                  Add item
                </button>
                {/* pass props to UploadModal component(dictates whether modal is visible) */}
                <UploadModal isOpen={isModalOpen} toggleModal={toggleModal} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

/* <div
className="top-sticky-div sticky top-0 -mx-1 h-14 bg-stone-400 z-10 
flex items-center justify-center text-xl font-bold
"
>
{currentFilter}
</div>
<div className="square-grid-container overflow-y-auto ">
<SquareGrid />
</div>
<div className="bottom-sticky-div  sticky bottom-0 -mx-1 h-12 bg-stone-400 z-10"></div> */

export default Closet;
