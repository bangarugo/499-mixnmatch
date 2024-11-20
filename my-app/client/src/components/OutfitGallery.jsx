import React from "react";

const OutfitGallery = () => {
  const num = 100;
  const squaresArray = Array.from({ length: num });
  return (
    <div
      // breakpoints for left padding because the scroll bar on the right adds padding too
      className="saved-outfit-container flex flex-col justify-center items-center gap-x-4 gap-y-2 
       "
    >
      {squaresArray.map((_, index) => (
        <div className="js-saved-outfit-card bg-ash-gray flex flex-col justify-center items-center mt-2 p-4 ">
          <div
            key={index}
            className="js-outfit-card w-64 h-128 p-2 bg-white border-4 border-black  "
          ></div>
          <h4 className="js-saved-outfit-name text-lg text-center w-full">
            Saved Outfit {index + 1}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default OutfitGallery;
