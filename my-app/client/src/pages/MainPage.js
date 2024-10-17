import React from "react";
import NavBar from "../components/NavBar";
import closetImage from "../images/purple-closet.jpg";
import icon1 from "../images/shirt.webp";
import icon2 from "../images/closet.webp";
import icon3 from "../images/outfit.webp";
import icon4 from "../images/profile.webp";
const mainPage = () => {
  return (
    <div className="homepage h-screen bg-gradient-to-r from-pink-400 to-purple-600 ">
      <NavBar />
      <main className="bg-gradient-to-r from-pink-400 to-purple-600 w-screen h-screen">
        <section
          className="logo-section flex flex-col justify-center items-center space-y-7 text-center
        bg-gradient-to-r from-pink-400 to-purple-600 "
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
              <img src={icon1} />
            </button>
            <button className="icon h-20 w-20 rounded-full bg-blue-400 p-4 ">
              <img src={icon2} />
            </button>
            <button className="icon h-20 w-20 rounded-full bg-green-400 p-4">
              <img src={icon3} />
            </button>
            <button className="icon h-20 w-20 rounded-full bg-yellow-400 p-4">
              <img src={icon4} />
            </button>
          </div>
          <button className="mix-button bg-yellow-300">Mix it up !</button>
        </section>

        <section
          className="bottom-cards flex flex-row w-full p-6 justify-between space-x-5
        bg-gradient-to-r from-pink-400 to-purple-600 text-white "
        >
          <div className="virtual-closet">
            <div className="card border w-80 h-36 p-4 text-center flex flex-col space-y-2 ml-36">
              <h3 className="text-3xl font-bold">Virtual Closet</h3>
              <p className="leading-relaxed">
                Digitize your wardrobe and access it anytime, anywhere.
              </p>
            </div>
          </div>
          <div className="ai-stylist">
            <div className="card border w-80 h-36 p-4 text-center flex flex-col space-y-2 mr-36  ">
              <h3 className="text-3xl font-bold">AI Stylist</h3>
              <p>
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

export default mainPage;
