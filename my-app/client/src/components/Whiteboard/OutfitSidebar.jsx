import React, { useEffect, useState } from "react";
import SearchFits from "./SearchCloset";
import ClosetGallery from "./ClosetGallery";
import {
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "react-tooltip";
import SavedOutfits from "./OutfitGallery";
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

const OutfitSidebar = ({
  setOutfitImages,
  refreshTrigger,
  setRefreshTrigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [savedOutfits, setSavedOutfits] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const containerControls = useAnimationControls();

  const toggleFavorite = async (outfitId) => {
    try {
      const response = await fetch("http://localhost:8080/favorite-outfit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?._id, outfitId }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle favorite");
      }

      setRefreshTrigger(!refreshTrigger); // Refresh the saved outfits list
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close ");
    }
  }, [isOpen]);

  const fetchSavedOutfits = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/saved-outfits?userId=${user?._id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch saved outfits");
      }

      const data = await response.json();
      setSavedOutfits(data.savedOutfits);
    } catch (error) {
      console.error("Error fetching saved outfits:", error);
    }
  };

  const handleDeleteOutfit = async (outfitId) => {
    try {
      const response = await fetch("http://localhost:8080/delete-outfit", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?._id, outfitId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete outfit");
      }

      // Remove the deleted outfit from state
      setSavedOutfits((prevOutfits) =>
        prevOutfits.filter((outfit) => outfit._id !== outfitId)
      );
    } catch (error) {
      console.error("Error deleting outfit:", error);
    }
  };

  const onLoadOutfit = (outfitImages) => {
    setOutfitImages(outfitImages);
  };

  useEffect(() => {
    fetchSavedOutfits();
  }, [refreshTrigger]);

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
        <SavedOutfits
          savedOutfits={savedOutfits}
          onLoadOutfit={onLoadOutfit}
          toggleFavorite={toggleFavorite}
          onDeleteOutfit={handleDeleteOutfit}
        />
      </div>
    </motion.aside>
  );
};

export default OutfitSidebar;
