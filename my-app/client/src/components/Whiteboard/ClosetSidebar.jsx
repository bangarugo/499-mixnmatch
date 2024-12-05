import React, { useEffect, useState } from "react";
import {
  PlusCircleIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "react-tooltip";

const ClosetSidebar = ({ closetData, onSelectImage, refreshTrigger }) => {
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
    <aside
      className="closet-section bg-medium-slate-blue flex flex-col space-y-3 p-2 w-1/4 rounded-r-lg  
      xl:p-4 xl:w-1/5"
    >
      <div className="closet-header flex justify-between items-center">
        <button className="size-6">
          <a className="fold-closet-tab">
            <ChevronLeftIcon />
          </a>
        </button>
        <h3 className="text-2xl font-bold p-1 w-full">Closet Pieces</h3>
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

      <div className="overflow-y-scroll">
        <section className="js-closet-items-section flex flex-col space-y-2">
          {closetPieceOptions?.map((closetPiece) => {
            const items = getItemsByCategory(closetPiece);

            return (
              <div
                key={closetPiece}
                className="flex flex-col items-center justify-evenly"
              >
                <div className="bg-magnolia text-black w-full py-2 sticky top-0 flex items-center">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-light text-xl">{closetPiece}</h3>
                  </div>
                  <button className="size-6 absolute right-0">
                    <PlusCircleIcon className="w-5" />
                  </button>
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
                    <p className="text-center text-sm text-gray-500">
                      No items found.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </aside>
  );
};

export default ClosetSidebar;
