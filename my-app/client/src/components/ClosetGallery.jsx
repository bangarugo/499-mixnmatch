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



  return (
    <div className="js-card-container flex gap-x-4 gap-y-2 snap-y  snap-proximity  ">
      {closetImages.map((index) => (
        <div
          key={index}
          className="js-card bg-blue-200 px-2 mt-2 p-4 xl:px-4 flex flex-col items-center gap-y-2  rounded text-black border border-black"
        >
          <img
            className="js-closet-item-img max-w-none border border-black  "
            src={shirt}
            alt="description of item"
          />
          <h4 className="closet-item-name text-lg font-semibold text-center ">
            Test Closet Item {index + 1}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default ClosetGallery;
