import React, { useState } from "react";
import NavBar from "../components/NavBar";
import ClosetSidebar from "../components/ClosetSidebar";
import OutfitSidebar from "../components/OutfitSidebar";
import { motion } from "framer-motion";

const Whiteboard = () => {
  return (
    <div className="page-background min-h-screen bg-medium-slate-blue text-white">
      <NavBar />
      <main
        className="bg-medium-slate-blue flex flex-row justify-between pb-2 pt-4 mb-8 text-center space-x-2 h-screen w-screen 
        xl:gap-x-1
      "
      >
        {/* This is where the users closet items will be displayed. */}
        <ClosetSidebar />
        {/* This is where the users current outfit will be displayed as will as the option to 
        display a second outfit to compare with. */}
        <div className="whiteboard-section  h-full flex flex-col  space-y-3 text-2xl p-2 w-1/2 rounded-lg xl:p-4 xl:xl:w-3/5 items-center">
          <motion.h3
            className=" font-bold p-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Current Outfit
          </motion.h3>
          <div className="whiteboard-space bg-white h-4/5 w-full rounded-sm flex flex-col items-center p-2 ">
            <div
              className="bg-red-500 w-full h-1/4"
              id="headwear-container"
            ></div>
            <div
              className="bg-yellow-500 w-full h-1/4"
              id="tops-container"
            ></div>
            <div className="bg-blue-500 w-full h-1/4"></div>
            <div className="bg-green-500 w-full h-1/4"></div>
          </div>
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
          <div className="mix-button-container w-full flex justify-center ">
            <button className="mix-button p-4 xl:w-1/4 text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded flex justify-center items-center   ">
              <span className="font-bold">Mix it up!</span>
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
