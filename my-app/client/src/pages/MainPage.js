import React from "react";
import { useNavigate } from "react-router-dom";
import closetImage from "../images/purple-closet.jpg";
import icon1 from "../images/shirt.webp";
import icon2 from "../images/closet.webp";
import icon3 from "../images/outfit.webp";
import icon4 from "../images/profile.webp";
import shuffle from "../images/shuffle.jpeg";

const MainPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleMixClick = () => {
    if (isAuthenticated) {
      navigate('/closet');  // Redirect to closet if logged in
    } else {
      navigate('/login');   // Redirect to login if not authenticated
    }
  };

  return (
    <div className="homepage h-screen bg-gradient-to-r from-pink-400 to-purple-700">
      <main className="bg-gradient-to-r from-pink-400 to-purple-700 w-screen h-screen">
        <section
          className="logo-section flex flex-col justify-center items-center space-y-4 text-center
        bg-gradient-to-r from-pink-400 to-purple-700 mt-0 "
        >
          <h1 className="text-6xl text-white font-bold w-full ">
            Your Style, Your Way
          </h1>
          <div
            className="circle-image bg-blue-500 h-128 w-128 rounded-full"
            style={{
              backgroundImage: `url(${closetImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            Image
          </div>
          <div className="icon-section flex space-x-8 p-4 ">
            <button className="icon h-20 w-20 rounded-full bg-red-400 p-4">
              <img src={icon1} alt="shirt icon" />
            </button>
            <button className="icon h-20 w-20 rounded-full bg-blue-400 p-4 ">
              <img src={icon2} alt="closet icon" />
            </button>
            <button className="icon h-20 w-20 rounded-full bg-green-400 p-4">
              <img src={icon3} alt="outfit icon" />
            </button>
            <button className="icon h-20 w-20 rounded-full bg-yellow-400 p-4">
              <img src={icon4} alt="profile icon" />
            </button>
          </div>
          <button
        onClick={handleMixClick}
        className="mix-button p-6 bg-white w-48 h-12 text-xl text-electric-indigo rounded-full border flex justify-between items-center"
      >
        <img src={shuffle} className="h-12 w-12" alt="shuffle icon" />
        <p className="font-bold">Mix it up!</p>
      </button>
        </section>
        <section
          className="bottom-cards flex flex-row w-full p-6 justify-center space-x-12
        bg-gradient-to-r from-pink-400 to-purple-700 text-white round-  "
        >
          <div className="virtual-closet">
            <div className="card border w-80 h-36 p-3 text-center flex flex-col space-y-2 bg-white/30 backdrop-blur-md shadow-lg rounded-md   ">
              <h3 className="text-3xl font-bold">Virtual Closet</h3>
              <p className="leading-relaxed text-l">
                Digitize your wardrobe and access it anytime, anywhere.
              </p>
            </div>
          </div>
          <div className="ai-stylist">
            <div
              className="card border w-80 h-36 p-3 text-center flex flex-col space-y-2 rounded-md 
              bg-white/30 backdrop-blur-md shadow-lg "
            >
              <h3 className="text-3xl font-bold">AI Stylist</h3>
              <p className="leading-relaxed text-l">
                Get personalized outfit recommendations based on your style and
                occasions.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
