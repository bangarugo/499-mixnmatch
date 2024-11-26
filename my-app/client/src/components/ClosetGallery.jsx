import React, { useEffect, useState } from "react";
import shirt from "../images/shirtnshorts.png";

// this component is meant to retrieve and display a users uploaded closet images
const ClosetGallery = () => {
  const [closetImages, setClosetImages]=useState([])
  // const num = 30;
  // const squaresArray = Array.from({ length: num });

//   http://localhost:8080/userinfo
// Method=GET
// payload shoudl JSON={
//     "userId":"573d67a480dfa8028958c467"
// }
const user = JSON.parse(localStorage.getItem("user"));

useEffect(()=>{

  getClosetImages()

}, [])

const getClosetImages=async()=>{
  const imagesData = await fetch("http://localhost:8080/userinfo", {
    method: "GET",
    body: user?._id,
  });
  setClosetImages(imagesData)
}


import closetItems from "./test-data/closetItems"; // array of objects for testing purposes
// this component is meant to retrieve and display a users uploaded closet images

const ClosetGallery = ({ category }) => {
  const filteredItems = closetItems.filter((item) => {
    return item.category === category;
  });
  return (
    <div className="js-card-container flex gap-x-4 gap-y-2  ">
      {filteredItems.map((card) => (
        <div
          key={card.id}
          className="js-card bg-blue-200 px-2 mt-2 p-4 xl:px-4 flex flex-col items-center gap-y-2  rounded text-black border border-black"
        >
          <img
            className="js-closet-item-img max-w-none size-48 border border-black  "
            src={card.image}
          />
          <h4 className="closet-item-name text-lg font-bold text-center ">
            {card.name}
          </h4>
        </div>
      ))}
      {filteredItems.length === 0 && (
        <p className="text-gray-500 text-center mt-4">
          No items in this category
        </p>
      )}
    </div>
  );
};

export default ClosetGallery;
