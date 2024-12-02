import React, { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
const UploadModal = ({ isOpen, toggleModal, userId, setImageUploaded }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const [currentCategory, setCategory] = useState("All");
  const categories = ["All", "Headwear", "Tops", "Bottoms", "Footwear"];
  const handleCategory = (category) => {
    setCategory(category);
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the uploaded file

    if (file) {
      // Check file type
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setErrorMessage("Only JPEG, PNG, and JPG files are accepted.");
        setSelectedImage(null); // Clear the selected image
        return;
      }

      setErrorMessage(""); // Clear any previous error messages
      setSelectedImage(file); // Set the selected image
    }
  };
  // Save image and call API
  const handleSave = async () => {
    if (!selectedImage) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user?._id); // Add userId
    formData.append("image", selectedImage); // Add the image file

    try {
      const response = await fetch("http://localhost:8080/upload-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setImageUploaded(true);

        // alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred.");
    }
    setSelectedImage(null);
    toggleModal(); // Close the modal
  };

  const handleDiscard = () => {
    setSelectedImage(null);
    toggleModal();
  };

  return (
    <>
      {isOpen && (
        <div
          className="flex flex-col justify-center items-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 z-20 border border-black"
          onClick={toggleModal}
        >
          <div
            className="flex flex-col justify-between items-center space-y-6 relative bg-ash-gray h-3/4 w-3/4 xl:w-1/2 p-6 rounded shadow-lg border border-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="js-close-button  " onClick={toggleModal}>
              <XCircleIcon />
            </button>

            <h2 className="upload-header text-xl font-bold text-black underline underline-offset-2 ">
              Upload Your Clothing Items
            </h2>

            {/* Image Upload Box */}
            <div className="upload-box bg-white h-full w-3/4 xl:w-3/5 flex flex-col justify-center items-center space-y-4 border border-black rounded">
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded"
                />
              ) : (
                <p className="text-gray-600">No file selected</p>
              )}
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleImageChange}
                className="text-sm"
              />

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </div>
            <div className="category-selection-section w-full flex flex-col  ">
              <p className="text-xl text-black underline underline-offset-2">
                Please choose a category for this upload
              </p>
              <div className="w-full flex items-center justify-between  py-2 ">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategory(category)}
                    className={`p-2 w-1/6 h-12 text-lg rounded border border-black
                drop-shadow-md
                transition ease-in-out delay-50
                hover:-translate-y-1 hover:scale-110
                ${
                  currentCategory === category
                    ? "bg-magnolia text-black "
                    : "bg-electric-indigo text-white "
                } transition-colors duration-300`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="save-options flex flex-row  w-full justify-center items-center gap-x-6">
              <button
                className="bg-green-500 h-16 w-36 rounded border border-black "
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-red-400 h-16 w-36 rounded border border-black"
                onClick={handleDiscard}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadModal;
