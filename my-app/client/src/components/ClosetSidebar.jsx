import React from "react";
import SearchFits from "./SearchCloset";
import ClosetGallery from "./ClosetGallery";
import {
  PlusCircleIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "react-tooltip";
const ClosetSidebar = () => {
  const closetPieceOptions = ["Headwear", "Tops", "Bottoms", "Footwear"];
  return (
    <aside
      className="closet-section bg-medium-slate-blue flex flex-col space-y-3 p-2 w-1/4  rounded-r-lg  
      xl:p-4 xl:w-1/5"
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
          Collapse
        </Tooltip>
        <Tooltip anchorSelect=".max-closet-tab" place="right">
          Maximize
        </Tooltip>
      </div>

      <SearchFits />
      <div className="overflow-y-scroll">
        <section className="js-closet-items-section  flex flex-col space-y-2 ">
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
              <div className="js-closet-option-container w-full h-full overflow-y-auto">
                <ClosetGallery />
              </div>
            </div>
          ))}
        </section>
      </div>
    </aside>
  );
};

export default ClosetSidebar;
