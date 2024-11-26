import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SquareGrid from "../components/Closet/SquareGridY";
import UploadModal from "../components/Closet/UploadModal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const ClosetPage = () => {
  const [currentCategory, setCategory] = useState("All");
  const categories = ["All", "Headwear", "Tops", "Bottoms", "Footwear"];
  const handleCategory = (category) => {
    setCategory(category);
  };

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const filterOptions = ["All", "Headwear", "Tops", "Bottoms", "Footwear"];

  const [closetImages, setClosetImages]=useState([])
  const [imageUploaded, setImageUploaded]= useState(false)
  // const num = 30;
  // const squaresArray = Array.from({ length: num });


const user = JSON.parse(localStorage.getItem("user"));

useEffect(()=>{
  getClosetImages()

}, [imageUploaded])


const userId=user?._id


const getClosetImages = async () => {
  try {
    const response = await fetch(`http://localhost:8080/userinfo?userId=${userId}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.error("Failed to fetch closet images:", response.statusText);
      return;
    }

    const data = await response.json(); // Parse the JSON response
    // Assuming images are located inside `data.user.images`
    setClosetImages(data.user.images);
  } catch (error) {
    console.error("Error fetching closet images:", error);
  }
};



  const handleFilter = (filter) => {
    setFilter(filter);
  };
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="page-background min-h-screen bg-medium-slate-blue   ">
      <NavBar />
      <div className="bg-medium-slate-blue  h-screen w-screen pt-4 pl-2 pr-2 pb-2 overflow-hidde   ">
        <main className="bg-blue-200 h-full w-full px-4 flex flex-col gap-y-4 text-center rounded drop-shadow-md border-2 border-black">
          <header className="font-bold py-4 border-b border-black ">
            <h2 className="text-3xl text-black ">Your Closet</h2>
          </header>

          <section className="js-clothing-options h-16 w-full py-2 flex flex-row gap-x-2 items-center justify-evenly">
            {categories.map((category) => (
              <button
                key={category}
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
              <button
                className="bg-yellow-500 text-lg px-4  h-12 w-36 rounded border border-black font-bold
              "
              >
                Favorites
              </button>
              <button
                className="bg-moonstone px-4 h-12 w-36 text-lg font-bold rounded drop-shadow-md border border-black
                    transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110"
              >
                View Outfits
              </button>
            </div>

            <button
              className=" add-item-button bg-green-500 h-12 w-36 text-lg font-bold rounded border border-black
                  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110"
              onClick={toggleModal}
            >
              Add item
            </button>
            <UploadModal isOpen={isModalOpen} toggleModal={toggleModal} />
          </div>
          <section className="closet-items-container bg-neutral-200 drop-shadow-lg rounded h-3/4 px-4 border border-black">
            <div className=" inner-closet-container flex flex-col w-full h-full gap-y-1   ">
              <div className=" sticky-top-div bg-neutral-200 w-1/4 sticky top-0 flex text-center  text-xl font-bold py-4 "></div>
              <div className="closet-grid-container bg-neutral-200 overflow-y-auto text-black border-t border-b border-black">
                <SquareGrid />
                {/* use text-ellipsis for item names that don't fit if theyre too long! */}
              </div>
              <div className="sticky-bottom-div  sticky bottom-0 mt-4 py-2"></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

/* <div
className="top-sticky-div sticky top-0 -mx-1 h-14 bg-stone-400 z-10 
flex items-center justify-center text-xl font-bold
"
>
{currentFilter}
</div>
<div className="square-grid-container overflow-y-auto ">
<SquareGrid />
</div>
<div className="bottom-sticky-div  sticky bottom-0 -mx-1 h-12 bg-stone-400 z-10"></div> */

export default ClosetPage;
