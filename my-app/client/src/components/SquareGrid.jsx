import React from "react";

const SquareGrid = () => {
  const num = 24;
  const squaresArray = Array.from({ length: num });
  return (
    <div className="h-128 overflow-y-auto grid grid-cols-4 gap-4 p-4 border border-gray-300">
      {squaresArray.map((index) => (
        <div
          className="w-30 h-24 bg-white border border-black"
          key={index}
        ></div>
      ))}
    </div>
  );
};

export default SquareGrid;
