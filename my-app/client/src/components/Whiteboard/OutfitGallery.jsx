import React from "react";

// here are where the users saved outfits will be displayed on the whiteboard page
const OutfitGallery = () => {
  const num = 100;
  const squaresArray = Array.from({ length: num });
  return (
    <div
      className="saved-outfit-container flex flex-col justify-center items-center gap-x-4 gap-y-2  
       "
    >
      {squaresArray.map((_, index) => (
        <div className="js-saved-outfit-card bg-ash-gray flex flex-col justify-center items-center mt-2 p-4 border border-black gap-y-2 ">
          <div
            key={index}
            className="js-outfit-card w-64 h-128 p-2 bg-white border border-black  "
          ></div>
          <h4 className="js-saved-outfit-name text-lg text-center w-full text-black font-bold">
            Saved Outfit {index + 1}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default OutfitGallery;
