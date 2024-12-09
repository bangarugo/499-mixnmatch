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
    <div className="page-background min-h-screen w-screen bg-medium-slate-blue">
      {/* NavBar on top */}
      <NavBar />

      {/* Main content section */}
      <div className="relative w-full min-h-screen p-2 overflow-hidden animate-fadeDown">
        <main className="bg-blue-200 w-full h-full p-4 flex flex-col gap-y-4 text-center rounded drop-shadow-md border-2 border-black">
          <header className="font-bold py-4 border-b border-black">
            <h2 className="text-3xl animate-fadeUp">Your Closet</h2>
          </header>

          {/* Removed the "ItemsOutfits" section */}

          <section className="clothing-options h-16 w-full p-2 flex flex-row space-x-4 items-center justify-evenly mx-auto">
            {filterOptions.map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => handleFilter(filterOption)}
                className={`p-2 w-1/5 h-12 text-lg rounded drop-shadow-md transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 border border-black ${
                  currentFilter === filterOption
                    ? "bg-magnolia text-black"
                    : "bg-electric-indigo text-white"
                }`}
              >
                {filterOption}
              </button>
            ))}
          </section>

          <div className="js-favorite-section relative flex flex-row items-center justify-between px-2 py-4 h-12 w-full ">
            <div className="gap-x-4 flex justify-start  text-center  w-3/5  ">
              <input
                type="text"
                placeholder="Search by name"
                className="search-bar p-2 text-black rounded border border-black
                xl:w-1/3 
                focus:outline-none focus:ring focus:ring-medium-slate-blue"
              />
              {/* <button
                className="bg-yellow-500 text-lg px-4  h-12 w-36 rounded border border-black font-bold text-white
              "
              >
                Favorites
              </button> */}
              {/* <button
                className="bg-moonstone px-4 h-12 w-36 text-lg font-bold rounded drop-shadow-md border border-black
                    transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110"
              >
                View Outfits
              </button> */}
            </div>
            <button
              className=" add-item-button bg-green-500 h-12 w-36 text-lg font-bold rounded border border-black text-white
                  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110"
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

{/* there's a weird space left at the bottom of the screen with min-h-[70vh]. I tried fixing with with mb-14 for now.  */}
          <section 
          className="closet-items-container bg-neutral-200 drop-shadow-lg rounded min-h-[70vh] mb-14 px-4 border border-black w-full   ">
            <div className="inner-closet-container flex flex-col w-full  gap-y-2">
              <div className="sticky-top-div bg-neutral-200 w-full sticky top-0 flex text-center text-xl font-bold py-4"></div>
              <div className="closet-grid-container bg-neutral-200 overflow-y-auto w-full text-black border-t border-b border-black min-h-full   ">
                <SquareGridY
                
                  closetImages={filteredImages}
                  setClosetImages={setClosetImages}
                  setImageDeleted={setImageDeleted}
                />
              </div>
              <div className="sticky-bottom-div sticky h-12  py-2 w-full border  ">
                {/* <button
                  className="add-item-button bg-green-300 h-12 w-36 text-lg font-bold rounded transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110"
                  onClick={toggleModal}
                >
                  Add item
                </button>
                <UploadModal
                  isOpen={isModalOpen}
                  toggleModal={toggleModal}
                  setImageUploaded={setImageUploaded}
                /> */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Closet;
