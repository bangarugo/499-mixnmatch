import React from "react";
import NavBar from "../components/NavBar";
import SearchFits from "../components/SearchFits";
import ClosetGallery from "../components/ClosetGallery";
import shuffle from "../images/arrows.png";
import {
  ArrowLeftIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  PlusCircleIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "react-tooltip";

// drag and drop items onto whiteboard?
// each section has 3 sizes: folded, unfolded (normal) and maximized

const Whiteboard = () => {
  const closetPieceOptions = ["Headwear", "Tops", "Bottoms", "Footwear"];
  return (
    <div className="page-background text-white">
      <NavBar />
      <main
        className="flex flex-row justify-between bg-red-400  pb-2 
      xl:bg-fairy-tale  pt-16   mb-8 xl:gap-x-1
      text-center space-x-2 h-screen w-screen animate-fadeDown fixed top-0 left-0 bottom-0
      "
      >
        {/* This is where the users closet items will be displayed. */}
        <div
          className="closet-section bg-medium-slate-blue flex flex-col space-y-3 p-2 w-1/4  rounded-r-lg
          
        xl:p-4 xl:w-1/5 "
        >
          <div className="closet-header flex justify-between items-center">
            <button className=" size-6 ">
              <a className="fold-closet-tab">
                <ChevronLeftIcon />
              </a>
            </button>
            <h3 className="text-2xl font-bold p-1 w-full ">Closet Pieces</h3>
            <button className="size-6">
              <a className="max-closet-tab">
                <ChevronDoubleRightIcon />
              </a>
            </button>
            <Tooltip anchorSelect=".fold-closet-tab" place="right">
              Fold
            </Tooltip>
            <Tooltip anchorSelect=".max-closet-tab" place="right">
              Maximize
            </Tooltip>
          </div>

          <SearchFits />
          <div className="overflow-y-scroll">
            <section className="closet-items-section  flex flex-col space-y-2 ">
              {closetPieceOptions.map((closetPiece) => (
                <div
                  key={closetPiece}
                  className=" flex flex-col items-center justify-evenly"
                >
                  <div className="bg-magnolia text-black w-full py-2 sticky top-0 flex items-center ">
                    <div className="flex-1 min-w-0 ">
                      <h3 className=" font-light text-xl ">{closetPiece}</h3>
                    </div>
                    <button className="size-6 absolute right-0">
                      <PlusCircleIcon className=" w-5" />
                    </button>
                  </div>
                  <div className="js-closet-option-container w-full h-64  ">
                    <ClosetGallery />
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
        {/* This is where the users current outfit will be displayed as will as the option to 
        display a second outfit to compare with. */}
        <div className="whiteboard-section bg-ash-gray h-4/5 flex flex-col space-y-3 text-2xl p-2 w-1/2 rounded-lg xl:p-4 xl:xl:w-3/5">
          <h3 className=" font-bold p-2">Current Outfit</h3>
          <div className="whiteboard-space bg-white h-4/5 rounded-sm"></div>
          <div className="flex flex-row w-full justify-between items-center text-center py-2 space-x-2 ">
            <button className="bg-green-500 p-2 w-1/4 rounded text-lg ">
              Save
            </button>
            <button className="bg-red-500 p-2 w-1/4 rounded text-lg">
              Discard
            </button>
            <button className="bg-blue-600 px-1 py-2 w-1/4 rounded text-lg">
              Compare
            </button>{" "}
            {/* compare maximizes the saved outfits */}
            <button className="bg-yellow-500 p-2 w-1/4 rounded text-lg">
              Favorite
            </button>
          </div>
          <div className="mix-button-container w-full flex justify-center">
            <button
              className="mix-button  bg-dark-purple p-4 xl:w-1/4 text-xl text-electric-indigo rounded
           flex justify-center items-center   "
            >
              <p className="font-bold ">Mix it up!</p>
            </button>
          </div>
        </div>
        {/* This is where the users saved outfits will be displayed.*/}
        <div
          className="js-saved-outfits-section bg-mountbatten-pink flex flex-col space-y-3 p-2 w-1/4 rounded-l-lg
        xl:p-4 xl:w-1/5"
        >
          <div className="closet-header flex justify-between items-center">
            <button className=" size-6 ">
              <a className="max-outfit-tab">
                <ChevronDoubleLeftIcon className="text-black" />
              </a>
            </button>
            <h3 className=" text-2xl text-black font-bold p-1 w-full ">
              Saved Outfits
            </h3>
            <button className="size-6">
              <a className="fold-outfit-tab">
                <ChevronRightIcon className="text-black" />
              </a>
            </button>
            <Tooltip anchorSelect=".fold-outfit-tab" place="left">
              Fold
            </Tooltip>
            <Tooltip anchorSelect=".max-outfit-tab" place="left">
              Maximize
            </Tooltip>
          </div>
          <SearchFits />
          <div className="bg-yellow-500 overflow-y-auto">
            {/* are you sure you want to load in outfit? (current outfit is not saved, save?) */}
          </div>
        </div>
      </main>
    </div>
  );
};

/* when a closet item piece if held and the closet section has been extended, lower its opacity and make the whiteboard section bigger */
/* allow the closet section and outfit section to be minimized, have a default size and extended size */

export default Whiteboard;
