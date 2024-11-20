import React from "react";

const OutfitGallery = () => {
  const num = 100;
  const squaresArray = Array.from({ length: num });
  return (
    <div
      // breakpoints for left padding because the scroll bar on the right adds padding too
      className="square-grid-outer-div flex space-x-4 pr-2 pl-3 snap-x
       "
    >
      {squaresArray.map((index) => (
        <div className="square-container flex flex-col justify-center py-2 items-center space-y-1 snap-center">
          <div
            key={index}
            className="image-square w-48 h-48 p-2 bg-white border-4 border-black flex-shrink-0  "
          ></div>
          <h4 className="closet-item-name text-lg text-center  w-full">
            `Saved Outfit ${index}`
          </h4>
        </div>
      ))}
    </div>
  );
};

export default OutfitGallery;
