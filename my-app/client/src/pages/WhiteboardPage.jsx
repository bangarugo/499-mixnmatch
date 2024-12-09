import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import OutfitSidebar from "../components/Whiteboard/OutfitSidebar";
import { motion } from "framer-motion";
import stringSimilarity from "string-similarity";
import ClosetSidebar from "../components/Whiteboard/ClosetSidebar";

const Whiteboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [outfitImages, setOutfitImages] = useState([]); // Store images
  const [closetData, setClosetData] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false); // Trigger for sidebar refresh

  const getClosetImages = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/userinfo?userId=${user?._id}`,
        { method: "GET" }
      );

      if (!response.ok) {
        console.error("Failed to fetch closet images:", response.statusText);
        return;
      }

      const data = await response.json();
      setClosetData(data);
    } catch (error) {
      console.error("Error fetching closet images:", error);
    }
  };

  const handleMixAndMatch = async () => {
    try {
      const response = await fetch("http://localhost:8080/mix-and-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?._id }),
      });

      const data = await response.json();
      const { outfit } = data; // Extract the outfit string
      const captions = outfit.split(",").map((str) => str.trim()); // Parse the outfit captions

      let closetImages;
      if (closetData) {
        closetImages = closetData?.user?.images;
      }

      // Match captions with closet images
      const matchedImages = captions.map((caption) => {
        const matches = closetImages.map((item) => ({
          url: item.url,
          score: stringSimilarity.compareTwoStrings(caption, item.caption),
        }));

        // Find the best match
        const bestMatch = matches.reduce((max, item) =>
          item.score > max.score ? item : max
        );

        // Return the image URL if similarity is above a threshold, otherwise null
        return bestMatch.score > 0.5 ? bestMatch.url : null;
      });

      const outFitImgs = matchedImages.filter((img) => img !== null);

      setOutfitImages(outFitImgs); // Set the images for the whiteboard
    } catch (error) {
      console.error("Error generating outfit:", error);
    }
  };

  const handleSavedOutfit = async (isFavorite = false) => {
    if (outfitImages.length === 0) {
      alert("Please generate an outfit first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/save-outfit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?._id, outfitImages, isFavorite }),
      });

      if (!response.ok) {
        throw new Error("Failed to save outfit");
      }

      setRefreshTrigger(!refreshTrigger); // Trigger sidebar refresh
    } catch (error) {
      console.error("Error saving outfit:", error);
    }
  };

  const handleImageSelect = (item) => {
    setOutfitImages((prev) => [...prev, item?.url]); // Add selected image to whiteboard
  };

  useEffect(() => {
    getClosetImages();
  }, []);

  return (
    <div className="page-background min-h-screen bg-medium-slate-blue text-white">
      <NavBar />
      <main className="bg-medium-slate-blue flex flex-row justify-between pb-2 pt-2  text-center space-x-2 h-screen w-screen xl:gap-x-1">
        <ClosetSidebar
          closetData={closetData?.user?.images}
          onSelectImage={handleImageSelect}
          refreshTrigger={refreshTrigger}
        />
        <div className="whiteboard-section h-full flex flex-col space-y-3 text-2xl p-2 w-1/2 rounded-lg xl:p-4 xl:xl:w-3/5 items-center">
          <motion.h3
            className="font-bold p-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className=" underline underline-offset-4">Current Outfit</h2>
          </motion.h3>
          <div
            className="whiteboard-space bg-white h-4/5 w-full rounded-sm flex flex-col items-center p-2 overflow-y-auto border-2 border-black"
            style={{ maxHeight: "80%" }}
          >
            {outfitImages?.every((image) => image === null) ? (
              <p className="text-gray-500">No match found</p>
            ) : (
              outfitImages.map(
                (image, index) =>
                  image && (
                    <div key={index} className="outfit-item-container mb-4">
                      <img
                        src={image}
                        alt={`Outfit item ${index + 1}`}
                        className="outfit-item-image w-full h-auto max-h-48 object-contain"
                      />
                    </div>
                  )
              )
            )}
          </div>
          <div className="flex flex-row w-3/5 justify-between items-center text-center py-2 space-x-2">
            <button
              className="bg-green-400 p-2 w-1/4 rounded text-lg border border-black"
              onClick={() => handleSavedOutfit(false)} // Normal save
            >
              Save
            </button>
            <button
              className="bg-red-400 p-2 w-1/4 rounded text-lg border border-black"
              onClick={() => {
                setOutfitImages([]);
                setRefreshTrigger(!refreshTrigger);
              }}
            >
              Clear
            </button>
            <button
              className="bg-yellow-400 p-2 w-1/4 rounded text-lg border border-black"
              onClick={() => handleSavedOutfit(true)} // Favourite save
            >
              Favorite
            </button>
          </div>
          <div className="mix-button-container w-full flex justify-center">
            <button
              className="mix-button p-4 xl:w-1/4 text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded flex justify-center items-center border border-black"
              onClick={handleMixAndMatch}
            >
              <span className="font-bold">Mix it up!</span>
            </button>
          </div>
        </div>
        <OutfitSidebar
          setOutfitImages={setOutfitImages}
          refreshTrigger={refreshTrigger}
          setRefreshTrigger={setRefreshTrigger}
        />
      </main>
    </div>
  );
};

export default Whiteboard;
