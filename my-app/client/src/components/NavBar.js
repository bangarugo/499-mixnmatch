import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <header
      className="flex justify-between items-center py-2 px-4 xl:px-16 bg-fairy-tale drop-shadow
      
      fixed top-0 left-0 z-10 text-white w-full "
    >
      <Link to="/">
        <h1 className=" text-lg sm:text-4xl  font-bold ">Mix n' Match</h1>
      </Link>
      <nav
        className="js-nav-links
        text-2xl flex items-center gap-x-5"
      >
        <Link to="/whiteboard">
          <h2 className=" border-2 border-green-300 rounded py-1 px-4 ">Whiteboard</h2>
        </Link>
        <Link to="/closet">
          <h2 className="border-2 border-blue-300 rounded py-1 px-4 ">Closet</h2>
        </Link>
        <Link to="/outfits">
          <h2 className="border-2 border-orange-300 rounded py-1 px-4 ">Outfits</h2>
        </Link>

        <Link to="/profile">
          <h2 className="border-2 border-yellow-300 rounded py-1 px-4 ">Profile</h2>
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
