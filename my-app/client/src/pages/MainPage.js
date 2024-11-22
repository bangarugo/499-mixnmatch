// MainPage.js
import React, { useRef } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import '../styles/cards.css';




const MainPage = () => {
  // const [currentSection, setCurrentSection] = useState("animation"); // State to switch between sections
  // const [isBottom, setIsBottom] = useState(false);
  // const navigate = useNavigate();
  const scrollRef = useRef(null);

  // // Scroll handling for navigation between sections
  // const handleScroll = () => {
  //   const scrollY = window.scrollY;
  //   const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

  //   if (scrollY >= pageHeight - 100) {
  //     setIsBottom(true);
  //   } else {
  //     setIsBottom(false);
  //     // setCurrentSection("cards");
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);



  return (
    <div className="relative">
      <NavBar />
      {/* <main  */}

      {/* Fixed Animation Section */}
      {/* <section
        className="relative w-screen h-screen bg-center bg-cover" */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1, // Set the z-index to -1 to keep it behind the content
          width: "100%",
          height: "100%",
        }}
        >
      
      {/* > */}

        <iframe
          loading="lazy"
          src="https://my.spline.design/distortingtypography-0249d79b86b112088ea9b55a5504c997/"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            border: "none",
          }}
          title="Distorting Typography"
        />

        {/* </iframe> */}
        {/* </section> */}
      </div>  

        
      {/* Content Section for Scrollable Cards */}
      <div
        ref={scrollRef}
        style={{
          position: "relative",
          marginTop: "100vh", // Push the content below the fixed section
          zIndex: 10,
        }}
        className="bg-gradient-to-r from-pink-400 to-purple-700 p-6" 
      >
        <div className="text-center py-12">
          <h1 className="text-4xl text-white font-bold">
            Discover Our Features
          </h1>
          <p className="text-lg text-white">
            Explore the features of Mix 'N Match and get started on your style journey.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Virtual Closet",
              description: "Digitize your wardrobe and access it anytime, anywhere.",
            },
            {
              title: "Design Outfits",
              description: "Head over to the Outfits page to mix and match items on a virtual whiteboard. Arrange pieces, experiment with styles, and create unique looks.",
            },
            {
              title: "Upload Pictures",
              description: "Each item is stored in your virtual closed ready for styling.",
            },
            {
              title: "Earn Badges",
              description: "You will unlock badges that reflect your style achievements and creative progress.",
            },
          ].map(({ title, description }, index  ) => (
            <motion.div
              key={index}
              className="card border w-80 h-36 p-3 text-center flex flex-col space-y-2 bg-white/30 backdrop-blur-md shadow-lg rounded-md"
              initial={{ opacity: 0, y: 100 }} // Start off-screen and transparent
              whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up when in view
              viewport={{ once: true }} // Trigger only once when it comes into view
              transition={{ duration: 0.8, delay: index * 0.2 }} // Animation duration
            >
              <h3 className="text-3xl font-bold">{title}</h3>
              <p className="mt-2">{description}</p>
            </motion.div>
          ))}
        </div>
        

      </div>
      {/* <section
        className="content-section pt-screen"
        > */}
        {/* <motion.section
          className="logo-section flex flex-col justify-center items-center space-y-4 text-center
        bg-gradient-to-r from-pink-400 to-purple-700 mt-0 "
        > */}
    
          {/*Logo section with animation */}
          {/* <motion.h1
            className="text-6xl text-white font-bold w-full z-10 "
            initial={{ opacity: 0 }} // initial state of the animation
            animate={{ opacity: 1 }} // final state of the animation
            transition={{ duration: 2 }} // duration of the animation
           >
            Your Style, Your Way
          </motion.h1> */}

          {/* <motion.div
            className="circle-image bg-blue-500 h-128 w-128 rounded-full"
            style={{
              backgroundImage: `url(${closetImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            initial={{ scale: 0.8 }} // initial state of the animation
            animate={{ scale: 1 }} // final state of the animation
            transition={{ duration: 1 }} // duration of the animation
          >
            Image
          </motion.div> */}


          {/* <div className="icon-section flex space-x-8 p-4 "> */}
            {/*Animated Icon Buttons*/}
            {/* <motion.button 
              className="icon h-20 w-20 rounded-full bg-red-400 p-4"
              whileHover={{ scale: 1.1 }} // Scale the icon on hover
              initial={{ scale: 0.8 }} // initial state of the animation
              transition={{ type: "spring", stiffness: 300 }} // spring animation
              >
              <img src={icon1} alt="" />
            </motion.button> */}

            {/* <motion.button 
              className="icon h-20 w-20 rounded-full bg-blue-400 p-4 "
              whileHover={{ scale: 1.1 }} // Scale the icon on hover
              initial={{ scale: 0.8 }} // initial state of the animation
              transition={{ type: "spring", stiffness: 300 }} // spring animation
              >
              <img src={icon2} alt="" />
            </motion.button> */}

            {/* <motion.button className="icon h-20 w-20 rounded-full bg-green-400 p-4"
              whileHover={{ scale: 1.1 }} // Scale the icon on hover
              initial={{ scale: 0.8 }} // initial state of the animation
              transition={{ type: "spring", stiffness: 300 }} // spring animation
            >
              <img src={icon3} alt="" />
            </motion.button> */}

            {/* <motion.button 
            className="icon h-20 w-20 rounded-full bg-yellow-400 p-4"
            whileHover={{ scale: 1.1 }} // Scale the icon on hover
              initial={{ scale: 0.8 }} // initial state of the animation
              transition={{ type: "spring", stiffness: 300 }} // spring animation
            >
              <img src={icon4} alt="" />
            </motion.button> */}
          {/* </div> */}
{/* 
          <motion.button 
            className="mix-button p-6 bg-white w-48 h-12 text-xl text-electric-indigo rounded-full border flex justify-between items-center  "
            scale={1.1} // Scale the button on hover
            backgroundColor="FF6F61" // Background color of the button
            whileHover={{ scale: 1.05 }} // Scale the button on hover
            transition={{ type: "spring", stiffness: 200 }} // spring animation
            >
            <img src={shuffle} alt="" className="h-12 w-12 " />
            <p className="font-bold ">Mix it up!</p>
          </motion.button> */}
        {/* </section> */}

        {/* Animated Iframe */}
        {/* <section className="iframe-section w-full h-1/2 mt-10">
          <AnimatedIframe /> */}
        {/* </motion.section> */}

        {/* <section
          className={`bottom-cards flex flex-row w-full p-6 justify-center space-x-12
        bg-gradient-to-r from-pink-400 to-purple-700 text-white rounded-md ${isBottom ? 'fixed bottom-0 left-0 z-10' : 'relative'}`}
        >
          <div className="virtual-closet">
            <motion.div 
              className="card border w-80 h-36 p-3 text-center flex flex-col space-y-2 bg-white/30 backdrop-blur-md shadow-lg rounded-md"
              initial={{ opacity: 0, y: 100 }} // Start off-screen and transparent
              whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up when in view
              viewport={{ once: true }} // Trigger only once when it comes into view
              transition={{ duration: 1 }} // Animation duration
              >
              <h3 className="text-3xl font-bold">Virtual Closet</h3>
              <p className="leading-relaxed text-l">
                Digitize your wardrobe and access it anytime, anywhere.
              </p>
            </motion.div>
          </div>
          <div className="whiteboard">
            <motion.div
              className="card border w-80 h-36 p-3 text-center flex flex-col space-y-2 rounded-md 
              bg-white/30 backdrop-blur-md shadow-lg "
              initial={{ opacity: 0, y: 100 }} // Start off-screen and transparent
              whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up when in view
              viewport={{ once: true }} // Trigger only once when it comes into view
              transition={{ duration: 1 }} // Animation duration
            >
              <h3 className="text-3xl font-bold">DESIGN OUTFITS ON THE WHITEBOARD</h3>
              <p className="leading-relaxed text-l">
                Head over to the Outfits page to mix and match items on a virtual whiteboard. Arrange 
                pieces, experiment with styles, and create unique looks. 
              </p>
            </motion.div>
          </div>
          <div className="upload-pictures">
            <motion.div
              className="card border w-80 h-36 p-3 text-center flex flex-col space-y-2 rounded-md 
              bg-white/30 backdrop-blur-md shadow-lg "
              initial={{ opacity: 0, y: 100 }} // Start off-screen and transparent
              whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up when in view
              viewport={{ once: true }} // Trigger only once when it comes into view
              transition={{ duration: 1 }} // Animation duration
            >
              <h3 className="text-3xl font-bold">UPLOAD PICTURES OF YOUR CLOTHES</h3>
              <p className="leading-relaxed text-l">
                Each item is stored in your virtual closed ready for styling.
              </p>
            </motion.div>
          </div>
          <div className="earn-badges">
            <motion.div
              className="card border w-80 h-36 p-3 text-center flex flex-col space-y-2 rounded-md 
              bg-white/30 backdrop-blur-md shadow-lg "
              initial={{ opacity: 0, y: 100 }} // Start off-screen and transparent
              whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up when in view
              viewport={{ once: true }} // Trigger only once when it comes into view
              transition={{ duration: 1 }} // Animation duration
            >
              <h3 className="text-3xl font-bold">EARN COOL BADGES</h3>
              <p className="leading-relaxed text-l">
                You will unlock badges that reflect your style achievements and creative progress.
              </p>
            </motion.div>
          </div>
        </section> */}
      {/* </section> */}
      {/* </main> */}
    </div>
  );
};

export default MainPage;
