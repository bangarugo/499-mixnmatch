import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <header className="flex justify-between p-8 bg-electric-indigo mb-8 text-white w-full">
      <h1 className="text-4xl font-bold ">Mix n' Match</h1>
      <nav className="text-2xl flex items-stretch space-x-5">
        <Link to="/">
          <h2>Home</h2>
        </Link>
        <Link to="/closet">
          <h2>Closet</h2>
        </Link>
        <Link to="/outfits">
          <h2>Outfits</h2>
        </Link>
        <Link to="/profile">
          <h2>Profile</h2>
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
