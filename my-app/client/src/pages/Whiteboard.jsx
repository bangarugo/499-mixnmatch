import React, { useState } from "react";
import NavBar from "../components/NavBar";

import ClosetSidebar from "../components/ClosetSidebar";
import OutfitSidebar from "../components/OutfitSidebar";

// drag and drop items onto whiteboard?
// each section has 3 sizes: folded, unfolded (normal) and maximized

const Whiteboard = () => {
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
        <ClosetSidebar />
        {/* This is where the users current outfit will be displayed as will as the option to 
        display a second outfit to compare with. */}
        <div className="whiteboard-section bg-moonstone h-4/5 flex flex-col space-y-3 text-2xl p-2 w-1/2 rounded-lg xl:p-4 xl:xl:w-3/5 items-center">
          <h3 className=" font-bold p-2">Current Outfit</h3>
          <div className="whiteboard-space bg-white h-4/5 w-1/2 rounded-sm"></div>
          <div className="  flex flex-row w-3/5 justify-between items-center text-center py-2 space-x-2 ">
            <button className="bg-green-400 p-2 w-1/4 rounded text-lg ">
              Save
            </button>
            <button className="bg-red-400 p-2 w-1/4 rounded text-lg">
              Clear
            </button>
            <button className="bg-blue-400 px-1 py-2 w-1/4 rounded text-lg">
              Compare
            </button>{" "}
            {/* compare maximizes the saved outfits */}
            <button className="bg-yellow-400 p-2 w-1/4 rounded text-lg">
              Favorite
            </button>
          </div>
          <div className="mix-button-container w-full flex justify-center">
            <button
              className="mix-button  bg-ash-gray p-4 xl:w-1/4 text-xl text-electric-indigo rounded
           flex justify-center items-center   "
            >
              <p className="font-bold ">Mix it up!</p>
            </button>
          </div>
        </div>
        {/* This is where the users saved outfits will be displayed.*/}
        <OutfitSidebar />
      </main>
    </div>
  );
};

/* when a closet item piece if held and the closet section has been extended, lower its opacity and make the whiteboard section bigger */
/* allow the closet section and outfit section to be minimized, have a default size and extended size */

export default Whiteboard;
