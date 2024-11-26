import React from "react";

// white squares are a placeholder for user uploaded pictures
// make the squares clickable and have them a modal show up that darkens the background
// and shows more detail about each clothing item (date added)

// idea
// if the user chooses to have the images displayed in rows then each image is followed by its info
// and therefore it's not clickable anymore to show more info
const SquareGridY = ({closetImages}) => {
  return (
    <div
      // breakpoints for left padding because the scroll bar on the right adds padding too
      className="square-grid-outer-div h-full pl-8 pr-4 py-2 
      grid gap-4
      grid-cols-2 sm:grid-cols-3 sm:pl-4   md:grid-cols-3 lg:pl-8    lg:grid-cols-5 xl:grid-cols-8 xl:pl-5
       "
    >
      {closetImages.map((image, ind) => (
        <div className="square-container flex flex-col justify-center items-center space-y-1" key={ind}>
          <img alt="user image" src={image?.url} width="300px" height="300px"/>
          {/* <div
            key={index}
            className="image-square w-24 h-24 sm:w-48 sm:h-48 p-2 bg-white border-2 border-black"
          ></div>
          <h4 className="closet-item-name text-lg text-center">
            Test Closet Item 123
          </h4> */}
        </div>
      ))}
    </div>
  );
};

export default SquareGridY;
