import React, { useEffect, useState } from "react";
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

const ClosetSidebar = ({ closetData, onSelectImage, refreshTrigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerControls = useAnimationControls();

  useEffect(() => {
    if (!isOpen) {
      containerControls.start("open");
    } else {
      containerControls.start("close");
    }
  }, [isOpen]);

  const closetPieceOptions = [
    "Headwear",
    "Tops",
    "Shirts",
    "Pants",
    "Footwear",
  ];
  const [selectedCategories, setSelectedCategories] = useState([]); // Track selected categories

  // Function to get items by category
  const getItemsByCategory = (category) =>
    closetData?.filter(
      (item) => item?.category?.toLowerCase() === category?.toLowerCase()
    );

  const handleImageClick = (item) => {
    if (selectedCategories.includes(item?.category)) {
      alert(`You can only select one item from the ${item.category} category.`);
      return;
    }

    // Add the selected category to the list and trigger the onSelectImage callback
    setSelectedCategories((prev) => [...prev, item?.category]);
    onSelectImage(item);
  };

  // Reset selected categories when the refreshTrigger changes
  useEffect(() => {
    setSelectedCategories([]);
  }, [refreshTrigger]);

  return (
    <motion.aside
      variants={containerVariants}
      animate={containerControls}
      initial="close"
      className="closet-section bg-neutral-200/50 flex flex-col space-y-3 p-2 w-1/4  rounded-r-lg border-2 border-black 
    xl:p-4 xl:w-1/5"
    >
      <div className="closet-header flex justify-between items-center">
        <motion.h3
          className="text-2xl font-bold p-1 w-full"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Closet Pieces
        </motion.h3>
      </div>

      <div className="overflow-y-scroll">
        <section className="js-closet-items-section flex flex-col space-y-2">
          {closetPieceOptions?.map((closetPiece) => {
            const items = getItemsByCategory(closetPiece);

            return (
              <div
                key={closetPiece}
                className="flex flex-col items-center justify-evenly"
              >
                <div className="bg-magnolia text-black w-full py-2 sticky top-0 flex items-center border border-black">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-light text-xl">{closetPiece}</h3>
                  </div>
                </div>
                <div className="js-closet-option-container w-full h-full overflow-y-auto grid grid-cols-2 gap-2 p-2">
                  {items?.length > 0 ? (
                    items?.map((item) => (
                      <img
                        key={item?._id}
                        src={item?.url}
                        alt={item?.caption}
                        onClick={() => handleImageClick(item)} // Handle image click
                        className={`object-cover w-full h-24 rounded shadow-md cursor-pointer ${
                          selectedCategories.includes(item?.category)
                            ? "opacity-50 pointer-events-none" // Dim selected items
                            : ""
                        }`}
                      />
                    ))
                  ) : (
                    <div className="flex justify-center items-center ">
                      <p className=" text-sm text-gray-500">No items found.</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </motion.aside>
  );
};

export default ClosetSidebar;
