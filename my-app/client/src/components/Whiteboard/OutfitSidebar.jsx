import React, { useEffect, useState } from "react";
import SearchFits from "./SearchCloset";
import ClosetGallery from "./ClosetGallery";
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
      className="closet-section  bg-neutral-200/50 backdrop-blur flex flex-col space-y-3 py-2 px-6 rounded-l-lg w-1/4 border-2 border-black
      xl:p-4 xl:w-1/5
  "
    >
      <div className="closet-header flex justify-between items-center">
        <motion.h3
          className=" text-2xl font-bold p-1 w-full underline-offset-4 "
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Saved Outfits
        </motion.h3>
      </div>
      <SearchFits />
      <div className="overflow-y-auto">
        {/* are you sure you want to load in outfit? (current outfit is not saved, save?) */}
        <OutfitGallery />
      </div>
    </motion.aside>
  );
};

export default OutfitSidebar;