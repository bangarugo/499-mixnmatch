import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SquareGrid from "../components/SquareGridY";
import UploadModal from "../components/UploadModal";

const Closet = () => {
  const [currentFilter, setFilter] = useState("All");
  const [isModalOpen, setModalOpen] = useState(false);
  const [closetImages, setClosetImages] = useState([]);
  const [imageUploaded, setImageUploaded] = useState(false);

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
  }, [imageUploaded]);

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
      const images = data.user.images;

      // Categorize images by their category
      const categorizedImages = images.reduce((acc, image) => {
        const { category, caption, url } = image;
        if (category) {
          if (!acc[category]) acc[category] = [];
          acc[category].push({ caption, url });
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
    <div className="page-background bg-medium-slate-blue">
      <NavBar />
      <div className="bg-fairy-tale h-screen w-screen pt-16 pl-2 pr-2 pb-2 overflow-hidden animate-fadeDown fixed top-0 left-0">
        <main className="bg-blue-300 h-full w-full p-4 flex flex-col gap-y-4 text-center rounded drop-shadow-md">
          <header className="font-bold p-2">
            <h2 className="text-3xl animate-fadeUp">Your Closet</h2>
          </header>
          <div className="flex flex-row bg-red-400">
            <div>Items</div>
            <div>Outfits</div>
          </div>

          <section className="clothing-options h-16 w-2/3 p-2 flex flex-row space-x-4 items-center justify-evenly">
            {filterOptions.map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => handleFilter(filterOption)}
                className={`p-2 w-1/5 h-12 text-lg rounded drop-shadow-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 ${
                  currentFilter === filterOption
                    ? "bg-magnolia text-black"
                    : "bg-electric-indigo text-white"
                } transition-colors duration-300`}
              >
                {filterOption}
              </button>
            ))}
          </section>

          <div className="filter-section flex flex-row items-center justify-between px-2 py-4 h-12">
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
            <button className="bg-yellow-500 h-12 w-24 rounded">
              Favorites
            </button>
          </div>

          <section className="closet-items-container bg-timberwolf drop-shadow-lg rounded h-3/4 px-4">
            <div className="inner-closet-container flex flex-col w-full h-full gap-y-1">
              <div className="sticky-top-div bg-stone-300 w-1/4 sticky top-0 flex text-center text-xl font-bold py-4"></div>
              <div className="closet-grid-container bg-stone-400 overflow-y-auto">
                <SquareGrid closetImages={filteredImages} />
              </div>
              <div className="sticky-bottom-div sticky bottom-0 mt-4 py-2">
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
