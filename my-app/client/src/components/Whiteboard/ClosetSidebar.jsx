import React, { useEffect, useState } from "react";
import SearchFits from "./SearchCloset.jsx";
import ClosetGallery from "./ClosetGallery.jsx";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { motion, useAnimationControls } from "framer-motion";
import closetItems from "../test-data/closetItems.js"; // array for testing drag and drop
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
  const categories = ["Headwear", "Tops", "Bottoms", "Footwear"];

  const [isOpen, setIsOpen] = useState(false);
  const containerControls = useAnimationControls();

  useEffect(() => {
    if (!isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <aside
      className="closet-section bg-medium-slate-blue flex flex-col space-y-3 p-2 w-1/4  rounded-r-lg  
      xl:p-4 xl:w-1/5"
    >
      <div className="closet-header flex justify-between items-center">
        <motion.h3
          className="text-2xl font-bold p-1 w-full "
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Closet Pieces
        </motion.h3>
      </div>

      <SearchFits />
      <div className="overflow-y-scroll">
        <section className="js-closet-items-section  flex flex-col space-y-2 ">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${category}-section flex flex-col items-center justify-evenly`}
            >
              <div className="bg-magnolia text-raisin-black w-full py-2 sticky top-0 flex items-center border border-black ">
                <div className="flex-1 min-w-0 ">
                  <h3 className=" font-light text-xl ">{category}</h3>
                </div>
                {/* <button className="size-6 absolute right-0">
                  <PlusCircleIcon className=" w-5" />
                </button> */}
              </div>
              <motion.div className="js-closet-item-category-container w-full h-full overflow-y-auto">
                <ClosetGallery category={category} />
              </motion.div>
            </div>
          ))}
        </section>
      </div>
    </aside>
  );
};

export default ClosetSidebar;
