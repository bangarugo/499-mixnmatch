import React from "react";
import SearchFits from "../components/SearchFits";
import ClosetGallery from "../components/ClosetGallery";
import {
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "react-tooltip";
const OutfitSidebar = () => {
  return (
    <aside
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
          Collapse
        </Tooltip>
        <Tooltip anchorSelect=".max-outfit-tab" place="left">
          Maximize
        </Tooltip>
      </div>
      <SearchFits />
      <div className="bg-yellow-500 overflow-y-auto">
        {/* are you sure you want to load in outfit? (current outfit is not saved, save?) */}
        <ClosetGallery />
      </div>
    </aside>
  );
};

export default OutfitSidebar;
