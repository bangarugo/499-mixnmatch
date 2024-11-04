import React from "react";
import NavBar from "../components/NavBar";
import SearchFits from "../components/SearchFits";
import SquareGrid from "../components/SquareGridY";
const Whiteboard = () => {
  return (
    <div className="page-background text-white">
      <NavBar />
      <div className="flex flex-row bg-raisin-black justify-between pt-28 pl-8 pr-8 pb-8 mb-8 text-center space-x-5 h-screen w-screen animate-fadeDown fixed top-0 left-0 bottom-0">
        {/* This is where the users closet items will be displayed. */}
        <div className="bg-electric-indigo flex flex-col space-y-5 p-4 w-1/5 rounded ">
          <h3 className=" bg-red-500 text-2xl ">Closet</h3>
          <SearchFits />
          <main className="">
            <label className="bg-white text-black">Headwear</label>
            <div className="square-grid overflow-x-auto">
              <SquareGrid />
            </div>
            <label className="bg-white">Tops</label>
          </main>
        </div>
        {/* This is where the users current outfit will be displayed as will as the option to 
        display a second outfit to compare with. */}
        <div className="bg-ash-gray flex flex-col space-y-5 text-2xl p-4 w-3/5 rounded">
          <h3 className="bg-blue-600">Current Outfit</h3>
          <div className="bg-pink-800">test 2</div>
        </div>
        {/* This is where the users saved outfits will be displayed.*/}
        <div className="bg-magnolia flex flex-col space-y-5 p-4 w-1/5 rounded ">
          <h3 className="bg-emerald-400 text-2xl">Saved Fits</h3>
          <SearchFits />
          <div className="bg-yellow-500">test 3</div>
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;
