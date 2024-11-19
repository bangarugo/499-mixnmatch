import React from "react";
import { Link } from "react-router-dom";
import { motion, transform } from "framer-motion";

const navBarVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const navLinkVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 20,
    },
  },
};

const NavBar = () => {
  return (
    <motion.div
      className="flex justify-between items-center py-2 px-4 xl:px-16 bg-medium-slate-blue shadow
      fixed top-0 left-0 z-10 text-white w-full "
      variants={navBarVariants}
      initial="hidden"
      animate="show"
    >
      <Link to="/">
        <motion.h1
          className=" text-lg sm:text-4xl  font-bold "
          variants={navLinkVariants}
        >
          Mix n' Match
        </motion.h1>
      </Link>

      <motion.nav
        className="js-nav-links text-2xl flex items-center gap-x-5"
        variants={navBarVariants}
      >
        <motion.div variants={navLinkVariants}>
          <Link to="/whiteboard">
            <h2 className=" border-2 border-green-300 rounded py-1 px-4">
              Whiteboard
            </h2>
          </Link>
        </motion.div>

        <motion.div variants={navLinkVariants}>
          <Link to="/closet">
            <h2 className="border-2 border-blue-300 rounded py-1 px-4 ">
              Closet
            </h2>
          </Link>
        </motion.div>

        <motion.div variants={navLinkVariants}>
          <Link to="/outfits">
            <h2 className="border-2 border-orange-300 rounded py-1 px-4 ">
              Outfits
            </h2>
          </Link>
        </motion.div>

        <motion.div variants={navLinkVariants}>
          <Link to="/profile">
            <h2 className="border-2 border-yellow-300 rounded py-1 px-4 ">
              Profile
            </h2>
          </Link>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
};

export default NavBar;
