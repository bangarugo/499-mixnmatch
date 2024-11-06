import React from "react";
// for image squares that can be scrolled from left to right
const SquareGrid = () => {
  const num = 100;
  const squaresArray = Array.from({ length: num });
  return (
    <div
      // breakpoints for left padding because the scroll bar on the right adds padding too
      className="square-grid-outer-div flex space-x-4  snap-center bg-green-400 pr-2 pl-3
       "
    >
      {squaresArray.map((index) => (
        <div className="square-container flex flex-col justify-center items-center space-y-1">
          <div
            key={index}
            className="image-square w-48 h-48 p-2 bg-white border-4 border-black flex-shrink-0 scroll-snap-align-start "
          ></div>
          <h4 className="closet-item-name text-lg text-center bg-yellow-600 w-full">
            Test Closet Item 123
          </h4>
        </div>
      ))}
    </div>
  );
};

export default SquareGrid;
