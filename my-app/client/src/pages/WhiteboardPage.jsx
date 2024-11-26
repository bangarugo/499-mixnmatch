import React, { useState } from "react";
import NavBar from "../components/NavBar";
import ClosetSidebar from "../components/Whiteboard/ClosetSidebar";
import OutfitSidebar from "../components/Whiteboard/OutfitSidebar";
import WhiteboardSpace from "../components/Whiteboard/WhiteboardSpace";
import { motion } from "framer-motion";

const categories = ["headwear", "tops", "bottoms", "footwear"];

const WhiteboardPage = () => {
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

        <div className="js-center-section  h-full flex flex-col  space-y-3 text-2xl p-2 w-1/2 rounded-lg xl:p-4 xl:xl:w-3/5 items-center">
          <motion.h3
            className=" font-bold p-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="underline underline-offset-4">Current Outfit</h2>
          </motion.h3>
          {/* whiteboard space where item cards can be placed*/}

          <WhiteboardSpace />

          <div className="  flex flex-row w-3/5 justify-between items-center text-center py-2 space-x-2 ">
            <button className="bg-green-400 p-2 w-1/4 rounded text-lg border border-black ">
              Save
            </button>
            <button className="bg-red-400 p-2 w-1/4 rounded text-lg border border-black">
              Clear
            </button>
            {/* <button className="bg-blue-400 px-1 py-2 w-1/4 rounded text-lg border border-black">
              Compare
            </button> */}
            <button className="bg-yellow-400 p-2 w-1/4 rounded text-lg border border-black">
              Favorite
            </button>
          </div>
          <div className="mix-button-container w-full flex justify-center ">
            <button className="mix-button p-4 xl:w-1/4 text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded flex justify-center items-center border border-black  ">
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

export default WhiteboardPage;
