import React, { useState } from "react";

const categories = [
  { value: "headwear", label: "Headwear (Caps, Hats, etc.)" },
  { value: "tops", label: "Tops (Jackets, Sweaters, etc.)" },
  { value: "shirts", label: "Shirts (T-Shirts, Shirts, etc.)" },
  { value: "pants", label: "Pants (Trousers, Shorts, etc.)" },
  { value: "footwear", label: "footwear (All kinds of shoes)" },
];

const UploadModal = ({ isOpen, toggleModal, setImageUploaded }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setErrorMessage("Only JPEG, PNG, and JPG files are accepted.");
        setSelectedImage(null);
        return;
      }

      setErrorMessage("");
      setSelectedImage(file);
    }
  };

  const handleSave = async () => {
    if (!selectedImage || !selectedCategory) {
      alert("Please upload an image and select a category.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user?._id);
    formData.append("image", selectedImage);
    formData.append("category", selectedCategory);

    try {
      const response = await fetch("http://localhost:8080/upload-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setImageUploaded(true);
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred.");
    }
    setSelectedImage(null);
    setSelectedCategory("");
    toggleModal();
  };

  const handleDiscard = () => {
    setSelectedImage(null);
    setSelectedCategory("");
    toggleModal();
  };

  return (
    <>
      {isOpen && (
        <div
          className="flex flex-col justify-center items-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleModal}
        >
          <div
            className="flex flex-col justify-between items-center space-y-6 relative bg-ash-gray h-4/4 w-3/4 xl:w-1/2 p-6 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button absolute top-2 right-4 text-2xl font-bold"
              onClick={toggleModal}
            >
              &times;
            </button>

            <h2 className="upload-header text-xl font-bold text-black ">
              Upload Images
            </h2>

            <div className="upload-box h-1/2 w-3/4 xl:w-3/5 flex flex-col justify-center items-center space-y-4">
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded"
                />
              ) : (
                <p className="text-gray-600">No Image selected</p>
              )}
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleImageChange}
                className="text-sm"
              />
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Select a Category
                </label>
                <select
                  id="category"
                  className="w-full p-3 border rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="None" disabled>
                    Select a Category
                  </option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

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
