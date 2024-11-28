import React from "react";

const WhiteboardSpace = ({ whiteboardItems }) => {
  return (
    <div className="js-whiteboard-space bg-white h-full w-full rounded-sm flex flex-col items-center p-2 border-2 border-black">
      {Object.entries(whiteboardItems).map(([category, items], index) => (
        <div
          key={index}
          className={`bg-category-${category.toLowerCase()} w-full h-1/4`}
          id={`${category.toLowerCase()}-container`}
        >
          <h3 className="bg-blue-300 text-xl border border-black w-full">
            {category}
          </h3>
          <div className="flex justify-center items-center text-center ">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-blue-200 p-2 m-2 rounded text-center border border-black"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-w-none size-24 border border-black"
                />
                <p className="text-lg text-black">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhiteboardSpace;
