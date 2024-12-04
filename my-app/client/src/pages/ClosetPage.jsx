import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SquareGridY from "../components/Closet/SquareGridY";
import UploadModal from "../components/Closet/UploadModal";

const Closet = ({ setAllClosetData }) => {
  const [currentFilter, setFilter] = useState("All");
  const [isModalOpen, setModalOpen] = useState(false);
  const [closetImages, setClosetImages] = useState([]);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageDeleted, setImageDeleted] = useState(false);

  const filterOptions = [
    "All",
    "Headwear",
    "Tops",
    "Shirts",
    "Pants",
    "Footwear",
  ];

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getClosetImages();
  }, [imageUploaded, imageDeleted]);

  const userId = user?._id;

  // Function to fetch closet images from the backend
  const getClosetImages = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/userinfo?userId=${userId}`,
        { method: "GET" }
      );

      if (!response.ok) {
        console.error("Failed to fetch closet images:", response.statusText);
        return;
      }

      const data = await response.json();
      setAllClosetData(data);
      const images = data.user.images;

      // Categorize images by their category
      const categorizedImages = images.reduce((acc, image) => {
        const { category, caption, url, _id } = image;
        if (category) {
          if (!acc[category]) acc[category] = [];
          acc[category].push({ caption, url, _id });
        }
        return acc;
      }, {});

      // Store categorized images in the state
      setClosetImages(categorizedImages);
    } catch (error) {
      console.error("Error fetching closet images:", error);
    }
  };

  // Filter function based on selected category
  const handleFilter = (filter) => {
    setFilter(filter);
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // Filter the closet images based on the current filter
  const filteredImages =
    currentFilter === "All"
      ? Object.values(closetImages).flat() // Show all items if "All" is selected
      : closetImages[currentFilter.toLowerCase()] || [];

  return (
    <div className="page-background min-h-screen w-screen bg-medium-slate-blue text-white">
      {/* NavBar on top */}
      <NavBar />

      {/* Main content section */}
      <div className="relative w-full min-h-screen pt-20 pl-4 pr-4 pb-4 overflow-hidden animate-fadeDown">
        <main className="bg-blue-300 w-full h-full p-4 flex flex-col gap-y-4 text-center rounded drop-shadow-md">
          <header className="font-bold p-2">
            <h2 className="text-3xl animate-fadeUp">Your Closet</h2>
          </header>

          {/* Removed the "ItemsOutfits" section */}

          <section className="clothing-options h-16 w-full p-2 flex flex-row space-x-4 items-center justify-evenly mx-auto">
            {filterOptions.map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => handleFilter(filterOption)}
                className={`p-2 w-1/5 h-12 text-lg rounded drop-shadow-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 ${
                  currentFilter === filterOption
                    ? "bg-magnolia text-black"
                    : "bg-electric-indigo text-white"
                }`}
              >
                {filterOption}
              </button>
            ))}
          </section>

          <div className="filter-section flex flex-row items-center justify-between px-2 py-4 h-12 w-full">
            <div className="space-x-4">
              <input
                type="text"
                placeholder="Search by name"
                className="search-bar p-2 text-black rounded w-42 focus:outline-none focus:ring focus:ring-medium-slate-blue"
              />
              <button className="bg-electric-indigo h-12 w-24 rounded">
                Filters
              </button>
              <button className="bg-electric-indigo h-12 w-24 rounded">
                Sort by
              </button>
            </div>
          </div>

          <section className="closet-items-container bg-timberwolf drop-shadow-lg rounded min-h-[70vh] px-4 border border-black w-full">
            <div className="inner-closet-container flex flex-col w-full h-full gap-y-1">
              <div className="sticky-top-div bg-stone-300 w-full sticky top-0 flex text-center text-xl font-bold py-4"></div>
              <div className="closet-grid-container bg-stone-400 overflow-y-auto w-full">
                <SquareGridY
                  closetImages={filteredImages}
                  setClosetImages={setClosetImages}
                  setImageDeleted={setImageDeleted}
                />
              </div>
              <div className="sticky-bottom-div mt-4 py-2 w-full">
                <button
                  className="add-item-button bg-green-300 h-12 w-36 text-lg font-bold rounded transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110"
                  onClick={toggleModal}
                >
                  Add item
                </button>
                <UploadModal
                  isOpen={isModalOpen}
                  toggleModal={toggleModal}
                  setImageUploaded={setImageUploaded}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Closet;
