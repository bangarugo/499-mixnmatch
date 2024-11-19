import React, { useEffect, useState } from "react";
import SearchFits from "./SearchCloset";
import ClosetGallery from "./ClosetGallery";
import {
  PlusCircleIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "react-tooltip";
import { motion, useAnimationControls } from "framer-motion";

const containerVariants = {
  close: {
    width: "0",
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 20,
      duration: 2,
    },
  },
  open: {
    width: "25%",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 2,
    },
  },
};
const ClosetSidebar = () => {
  const closetPieceOptions = ["Headwear", "Tops", "Bottoms", "Footwear"];

  const [isOpen, setIsOpen] = useState(false);
  const containerControls = useAnimationControls();

  useEffect(() => {
    if (!isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close ");
    }
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <motion.aside
      variants={containerVariants}
      animate={containerControls}
      initial="close"
      className={`closet-section border-2 border-fairy-tale backdrop-blur flex flex-col space-y-3 p-2 rounded-r-lg 
      w-1/4
      xl:p-4 xl:w-1/5`}
    >
      <div className="closet-header flex justify-between items-center">
        <button className=" size-6 " onClick={() => handleOpenClose()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <motion.h3
          className={`text-2xl font-bold p-1 w-full underline underline-offset-4`}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Closet Pieces
        </motion.h3>
        {/* <button className="size-6">
          <a className="max-closet-tab">
            <ChevronDoubleRightIcon />
          </a>
        </button>
        <Tooltip anchorSelect=".fold-closet-tab" place="right">
          Collapse
        </Tooltip>
        <Tooltip anchorSelect=".max-closet-tab" place="right">
          Maximize
        </Tooltip> */}
      </div>

      <SearchFits />
      <div className="overflow-y-scroll">
        <section className="js-closet-items-section  flex flex-col space-y-2 ">
          {closetPieceOptions.map((closetPiece) => (
            <div
              key={closetPiece}
              className=" flex flex-col items-center justify-evenly"
            >
              <div className="bg-magnolia text-raisin-black w-full py-2 sticky top-0 flex items-center ">
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
    </motion.aside>
  );
};

export default ClosetSidebar;
