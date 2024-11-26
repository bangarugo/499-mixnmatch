import React, { useState } from "react";

const UploadModal = ({ isOpen, toggleModal, userId,setImageUploaded }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

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
        setImageUploaded(true)
       
        // alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred.");
    }
    setSelectedImage(null)
    toggleModal(); // Close the modal
  };

  const handleDiscard=()=>{
    setSelectedImage(null)
    toggleModal()
  }

  return (
    <>
      {isOpen && (
        <div
          className="flex flex-col justify-center items-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleModal}
        >
          <div
            className="flex flex-col justify-between items-center space-y-6 relative bg-ash-gray h-3/4 w-3/4 xl:w-1/2 p-6 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="js-close-button  "
              onClick={toggleModal}
            >
              <XCircleIcon />
            </button>

            <h2 className="upload-header text-xl font-bold text-black ">
              Upload Files
            </h2>

            {/* Image Upload Box */}
            <div className="upload-box bg-white h-1/2 w-3/4 xl:w-3/5 flex flex-col justify-center items-center space-y-4">
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

            <div className="save-options flex flex-row space-x-5 h-1/6 w-3/5 justify-evenly items-center">
              <button
                className="bg-green-600 h-12 w-24 rounded"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-red-600 h-12 w-24 rounded"
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
