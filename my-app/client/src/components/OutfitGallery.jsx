import React from "react";

import { HeartIcon } from "@heroicons/react/24/solid"; // Import an icon

const SavedOutfits = ({ savedOutfits, onLoadOutfit, onDeleteOutfit }) => {
  return (
    <div className="overflow-y-auto">
      {savedOutfits.length === 0 ? (
        <p className="text-gray-500">No saved outfits</p>
      ) : (
        savedOutfits.map((outfit, index) => (
          <div
            key={index}
            className="saved-outfit-item cursor-pointer relative"
            onClick={() => onLoadOutfit(outfit.outfitImages)}
          >
            {outfit.isFavorite && (
              <div className="absolute top-2 left-0 text-red-500">
                <HeartIcon className="w-6 h-6" />
              </div>
            )}
            {outfit.outfitImages.map((image, i) => (
              <img
                key={i}
                src={image}
                alt={`Saved outfit item ${i + 1}`}
                className="w-16 h-16 object-cover inline-block m-1"
              />
            ))}

            <p className="text-sm text-gray-600 mb-2">{`Saved Outfit ${
              index + 1
            }`}</p>

            {/* Delete button */}
            <button
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
              onClick={() => onDeleteOutfit(outfit._id)}
            >
              ✖
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedOutfits;
