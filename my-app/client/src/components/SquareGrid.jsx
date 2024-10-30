import React from "react";

// white squares are a placeholder for user uploaded pictures
// make the squares clickable and have them a modal show up that darkens the background
// and shows more detail about each clothing item (date added)

// if the user chooses to have the images displayed in rows then each image is followed by its info
// and therefore it's clickable anymore!
const SquareGrid = () => {
  const num = 36;
  const squaresArray = Array.from({ length: num });
  return (
    <div
      className="h-128 p-4 border border-gray-300
      grid grid-cols-2  sm:grid-cols-6 lg:grid-cols-10 gap-4 "
    >
      {squaresArray.map((index) => (
        <div className="w-30 h-30 bg-white border border-black" key={index}>
          <h3 className="bg-red-400">Test</h3>
        </div>
      ))}
    </div>
  );
};

export default SquareGrid;
