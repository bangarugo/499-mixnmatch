import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ isAuthenticated, handleLogout }) => {
  return (
    <header
      className="flex justify-between items-center px-8 py-4 bg-gradient-to-r from-blue-700 to-purple-700 text-white w-full fixed top-0 left-0 z-10"
      style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
    >
      <h1 className="text-4xl font-bold">Mix n' Match</h1>
      <nav className="text-2xl flex items-center space-x-8">
        <Link to="/" className="hover:text-gray-300 transition-colors">
          <h2>Home</h2>
        </Link>
        <Link to="/closet" className="hover:text-gray-300 transition-colors">
          <h2>Closet</h2>
        </Link>
        <Link to="/outfits" className="hover:text-gray-300 transition-colors">
          <h2>Outfits</h2>
        </Link>
        <Link to="/profile" className="hover:text-gray-300 transition-colors">
          <h2>Profile</h2>
        </Link>

        {/* Login/Logout Button with matching style */}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full text-white transition-colors"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full text-white transition-colors">
              Login
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
