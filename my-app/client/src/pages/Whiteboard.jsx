import React from "react";
import NavBar from "../components/NavBar";
import SearchFits from "../components/SearchFits";
import SquareGridX from "../components/SquareGridX";
import SquareGridY from "../components/SquareGridY";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

// drag and drop items onto whiteboard?
const Whiteboard = () => {
  return (
    <div className="page-background text-white">
      <NavBar />
      <div
        className="flex flex-row justify-between bg-red-400 px-2 pb-2
      xl:bg-raisin-black  pt-28 xl:pl-8 xl:pr-8 xl:pb-8 mb-8 xl:space-x-5
      text-center space-x-2 h-screen w-screen animate-fadeDown fixed top-0 left-0 bottom-0
      "
      >
        {/* This is where the users closet items will be displayed. */}
        <div
          className="closet-section bg-electric-indigo flex flex-col space-y-3 p-2 w-1/4  rounded 
        xl:p-4 xl:w-1/5"
        >
          <div className="closet-header flex justify-between items-center">
            <button className="size-10">
              <ArrowLeftCircleIcon />
            </button>
            <h3 className=" bg-red-500 text-2xl p-1 "> Closet</h3>
            <button className="size-14">
              <ArrowRightCircleIcon />
            </button>
          </div>

          <SearchFits />
          <div className="overflow-y-scroll">
            <section className="bg-blue-400 closet-items-section flex flex-col space-y-2 ">
              <div className="bg-pink-600 text-lg sticky top-0">Headwear</div>
              <div className="square-grid-container snap-x w-full  flex flex-row overflow-x-auto whitespace-nowrap scroll-smooth ">
                <SquareGridX />
              </div>
              <label className="bg-pink-600 text-lg sticky top-0">Tops</label>
              <div className="square-grid-container snap-x w-full py-4  flex flex-row overflow-x-auto whitespace-nowrap scroll-smooth ">
                <SquareGridX />
              </div>
              <label className="bg-pink-600 text-lg">Bottoms</label>
              <div className="square-grid-container snap-x w-full py-4  flex flex-row overflow-x-auto whitespace-nowrap scroll-smooth ">
                <SquareGridX />
              </div>
              <label className="bg-pink-600 text-lg">Footwear</label>
              <div className="square-grid-container snap-x w-full py-4  flex flex-row overflow-x-auto whitespace-nowrap scroll-smooth ">
                <SquareGridX />
              </div>
            </section>
          </div>
        </div>
        {/* This is where the users current outfit will be displayed as will as the option to 
        display a second outfit to compare with. */}
        <div className="whiteboard-section bg-ash-gray flex flex-col space-y-3 text-2xl p-2 w-1/2 rounded xl:p-4 xl:xl:w-3/5">
          <h3 className="bg-blue-600">Current Outfit</h3>
          <div className="whiteboard-space bg-pink-800 h-4/5 text-center">
            whiteboard space
          </div>
          <div className="flex flex-row w-full justify-between items-center bg-orange-400">
            <button>Save</button>
            <button>Discard</button>
            <button>Compare</button>
            <button>Favorite</button>
          </div>
        </div>
        {/* This is where the users saved outfits will be displayed.*/}
        <div
          className="bg-magnolia flex flex-col space-y-3 p-2 w-1/4 rounded
        xl:p-4 xl:w-1/5"
        >
          <div className="closet-header flex justify-between items-center">
            <button className="size-24">
              <ArrowLeftCircleIcon />
            </button>
            <h3 className=" bg-emerald-300 text-2xl p-1 "> Closet</h3>
            <button className="size-24">
              <ArrowRightCircleIcon />
            </button>
          </div>
          <SearchFits />
          <div className="bg-yellow-500 overflow-y-auto">
            <SquareGridY />
            {/* are you sure you want to load in outfit? (current outfit is not saved, save?) */}
          </div>
        </div>
      </div>
    </div>
  );
};

/* when a closet item piece if held and the closet section has been extended, lower its opacity and make the whiteboard section bigger */
/* allow the closet section and outfit section to be minimized, have a default size and extended size */

export default Whiteboard;
