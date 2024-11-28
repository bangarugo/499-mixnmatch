import React, { useEffect, useState } from "react";
import closetItems from "../test-data/closetItems"; // array of objects for testing purposes
// this component is meant to retrieve and display a users uploaded closet images

const ClosetGallery = ({ category, addToWhiteboard }) => {
  const [closetImages, setClosetImages] = useState([]);

  //   http://localhost:8080/userinfo
  // Method=GET
  // payload shoudl JSON={
  //     "userId":"573d67a480dfa8028958c467"
  // }

  // const user = JSON.parse(localStorage.getItem("user"));

  // useEffect(() => {
  //   getClosetImages();
  // }, []);

  // const getClosetImages = async () => {
  //   const imagesData = await fetch("http://localhost:8080/userinfo", {
  //     method: "GET",
  //     body: user?._id,
  //   });
  //   setClosetImages(imagesData);
  // };

  // display closet items based on the category
  const filteredItems = closetItems.filter((item) => {
    return item.category === category;
  });

  return (
    <div className="js-card-container flex gap-x-4 gap-y-2  ">
      {filteredItems.map((card) => (
        <div
          key={card.id}
          className="js-card bg-blue-200 p-4 mt-2  xl:px-4 flex flex-col items-center gap-y-1  rounded text-black border border-black"
        >
          <img
            className="js-closet-item-img max-w-none size-48 border border-black  "
            src={card.image}
          />
          <h4 className="closet-item-name text-lg  text-center ">
            {card.name}
          </h4>
          <button
            className="bg-green-500 text-white font-light px-6 py-2 rounded border border-black"
            onClick={() => addToWhiteboard(card.category, card)}
          >
            Add
          </button>
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
