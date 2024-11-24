import React from "react";
import { motion } from "framer-motion";
// This is the modal that appears when a user wants to add a new item to their closet
// here a user can upload clothing item pictures
// conditonally render the upload modal if the user clicks the "Add Item button"
const UploadModal = ({ isOpen, toggleModal }) => {
  return (
    <>
      {isOpen && (
        <div
          className="flex flex-col justify-center items-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleModal}
        >
          <div
            className="flex flex-col justify-between items-center space-y-6 relative bg-ash-gray h-3/4 w-3/4 xl:w-1/2 p-6 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()} // stop modal from closing when clicking anywhere on it
          >
            <button
              className="close-button absolute top-2 right-4 text-2xl font-bold"
              onClick={toggleModal}
            >
              &times;
            </button>

            <h2 className="upload-header text-xl font-bold text-black ">
              {" "}
              Upload Files{" "}
            </h2>
            <button className="upload-box bg-white h-1/2 w-3/4 xl:w-3/5 "></button>
            <div className="save-options flex flex-row space-x-5 h-1/6 w-3/5 justify-evenly items-center">
              <button className="bg-green-600 h-12 w-24 rounded">Save</button>
              <button className="bg-red-600 h-12 w-24 rounded">Discard</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadModal;
