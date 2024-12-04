import React, { useEffect, useState } from "react";
import shirt from "../../images/shirtnshorts.png";

// this component is meant to retrieve and display a users uploaded closet images
const ClosetGallery = () => {
  const [closetImages, setClosetImages] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getClosetImages();
  }, []);

  const getClosetImages = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/userinfo?userId=${user?._id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch closet images:", response.statusText);
        return;
      }

      const data = await response.json(); // Parse the JSON response
      // Assuming images are located inside `data.user.images`
      setClosetImages(data.user.images);
    } catch (error) {
      console.error("Error fetching closet images:", error);
    }
  };

  return (
    <div className="js-card-container flex gap-x-4 gap-y-2 snap-y  snap-proximity  ">
      {closetImages.map((index) => (
        <div
          key={index}
          className={`js-card bg-blue-300 px-2 mt-2 p-4 xl:px-4 flex flex-col  items-center gap-y-2 snap-center rounded
            first:
        `}
        >
          <img
            className="js-closet-item-img max-w-none rounded-lg   "
            src={shirt}
            alt="description of item"
          />
          <h4 className="closet-item-name text-lg font-semibold text-center">
            Test Closet Item {index + 1}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default ClosetGallery;
