import React, { useEffect, useState } from "react";
import SearchFits from "./SearchCloset";
import ClosetGallery from "../components/ClosetGallery";
import {
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "react-tooltip";
import OutfitGallery from "./OutfitGallery";
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
      damping: 15,
      duration: 22,
    },
  },
};

const OutfitSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerControls = useAnimationControls();
  useEffect(() => {
    if (!isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close ");
    }
  }, [isOpen]);

  return (
    <motion.aside
      variants={containerVariants}
      animate={containerControls}
      initial="close"
      className="js-saved-outfits-section border-2 border-eggplant flex flex-col space-y-3 p-2 w-1/4 rounded-l-lg
  "
    >
      <div className="closet-header flex justify-between items-center">
        {/* <button className=" size-6 ">
          <a className="max-outfit-tab">
            <ChevronDoubleLeftIcon className="text-black" />
          </a>
        </button> */}
        <motion.h3
          className=" text-2xl underline font-bold p-1 w-full underline-offset-4 "
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Saved Outfits
        </motion.h3>
        {/* <button className="size-6">
          <a className="fold-outfit-tab">
            <ChevronRightIcon className="text-black" />
          </a>
        </button>
        <Tooltip anchorSelect=".fold-outfit-tab" place="left">
          Collapse
        </Tooltip>
        <Tooltip anchorSelect=".max-outfit-tab" place="left">
          Maximize
        </Tooltip> */}
      </div>
      <SearchFits />
      <div className="bg-yellow-500 overflow-y-auto">
        {/* are you sure you want to load in outfit? (current outfit is not saved, save?) */}
        <ClosetGallery />
      </div>
    </motion.aside>
  );
};

export default OutfitSidebar;
