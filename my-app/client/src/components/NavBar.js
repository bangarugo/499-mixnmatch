import React from "react";
import { Link } from "react-router-dom";
import { motion, transform } from "framer-motion";
import logo from '../images/mixnmatch-logo.png';

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
      className="apply bg-black text-white py-8 px-10 flex justify-between items-center "
      variants={navBarVariants}
      initial="hidden"
      animate="show"
    >
      {/* <Link to="/">
        <motion.h1
          className=" text-lg sm:text-4xl  font-bold "
          variants={navLinkVariants}
        >
          MIX n' MATCH
        </motion.h1>
      </Link> */}

      <Link to="/welcome">
        <motion.img
          src={logo}
          alt="Mix n' Match logo"
          // className="h-16 w-16 sm:h-16"
          style={{ height: "100px", width: "auto" }}
          variants={navLinkVariants}
        />
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
