import React, { useState } from "react";

// SquareGridY component with constant delete button and confirmation modal
const SquareGridY = ({ closetImages, setClosetImages, setImageDeleted }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Function to open the confirmation modal with the selected image details
  const openModal = (image) => {
    setSelectedItem(image);
    setModalOpen(true);
  };

  // Function to close the confirmation modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  // Function to delete an image
  const deleteImage = async (imageId) => {
    try {
      // Send a DELETE request to the backend with the image ID
      const response = await fetch(
        `http://localhost:8080/delete-image/${imageId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Image deleted successfully, update UI

        // Remove the deleted image from the list of images in the UI
        const updatedImages = closetImages.filter(
          (image) => image._id !== imageId
        );
        setImageDeleted(true);
        setClosetImages(updatedImages); // Update the state
      } else {
        // Handle any error that occurs
        alert("Failed to delete the image.");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("An error occurred while deleting the image.");
    }
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="square-grid-outer-div h-full pl-8 pr-4 py-2 grid gap-4 grid-cols-2 sm:grid-cols-3 sm:pl-4 md:grid-cols-3 lg:pl-8 lg:grid-cols-5 xl:grid-cols-8 xl:pl-5">
      {closetImages.length > 0 ? (
        closetImages.map((image, ind) => (
          <div
            className="square-container relative flex flex-col justify-center items-center space-y-1"
            key={ind}
          >
            {/* Constant delete icon */}
            <button
              className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
              onClick={() => openModal(image)} // Open the confirmation modal on click
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image Display */}
            <img
              alt="user items"
              src={image?.url}
              className="closet-image w-[150px] h-[150px] object-cover"
            />
          </div>
        ))
      ) : (
        <h4 className="closet-item-name text-lg text-center">
          No items uploaded yet
        </h4>
      )}

      {/* Confirmation Modal for Delete */}
      {modalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Confirm Deletion</h2>
              <button className="text-red-500" onClick={closeModal}>
                &times; {/* Close button */}
              </button>
            </div>
            <div className="mt-4 text-center">
              <img
                alt="item to be deleted"
                src={selectedItem?.url}
                className="closet-image w-[200px] h-[200px] object-cover"
              />
              <p className="text-sm text-gray-700">
                Are you sure you want to delete this image?
              </p>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                onClick={() => deleteImage(selectedItem._id)} // Delete the image
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                onClick={closeModal} // Cancel button
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SquareGridY;
