import React from "react";
import { useDroppable } from "@dnd-kit/core";


const WhiteboardSpace = () => {
  return (
    <div className="js-whiteboard-space bg-white h-4/5 w-full rounded-sm flex flex-col items-center p-2 border-2 border-black">
      <div className="bg-red-500 w-full h-1/4" id="headwear-container">
        <h3 className="bg-blue-400 text-lg">Headwear</h3>
      </div>
      <div className="bg-yellow-500 w-full h-1/4" id="tops-container">
        <h3 className="bg-blue-400 text-lg">Tops</h3>
      </div>
      <div className="bg-blue-500 w-full h-1/4">
        <h3 className="bg-blue-400 text-lg">Bottoms</h3>
      </div>
      <div className="bg-green-500 w-full h-1/4">
        <h3 className="bg-blue-400 text-lg">Footwear</h3>
      </div>
    </div>
  );
};

export default WhiteboardSpace;
