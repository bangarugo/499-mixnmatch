// MainPage.js
import React from "react";
import Spline from '../components/home-spline';
import '../styles/home-spline.css';
import NavBar from '../components/NavBar';
import { motion } from 'framer-motion';

const MainPage = () => {
  return (
    <div>
      <NavBar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-screen"
      >
        <Spline />
      </motion.div>
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold">Welcome to Mix n' Match</h1>
        <p className="text-lg mt-4">Find your perfect outfit with our virtual closet and AI recommendations.</p>
        <div className="mt-8">
          <button className="bg-electric-indigo text-white py-2 px-6 rounded-lg hover:bg-medium-slate-blue">
            Start Browsing
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
