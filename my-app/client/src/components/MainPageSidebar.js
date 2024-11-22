import React, { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to keep track of whether the sidebar is open or not
    const controls = useAnimationControls(); // Controls for the sidebar animation

    // Function to handle opening and closing the sidebar
    useEffect(() => {
        if (isOpen) {
            controls.start({ width: '250px', opacity: 1 });
        } else {
            controls.start({ width: '0', opacity: 0 });
        }
    }, [isOpen, controls]);

// Toggle the sidebar open and close
const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
};

return (
    <div className="flex overflow-hidden">
        {/* Sidebar Button to open/close */}
        <button onClick={toggleSidebar} className="p-4 bg-gray-800 text-white">
            {/* {isOpen ? 'Close' : 'Open'} */}
        </button>

        {/* Sidebar Animation */}
        <motion.div
            className="sidebar bg-blue-600 text-white h-screen p-4"
            initial={{ width: 0, opacity: 0 }}
            animate={controls}
            transition={{ duration: 0.5 }}
            style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1622838320004-4b3b3b3b3b3b")`,
            }}
        >
            <div className="iframe-container mt-4">
                <iframe
                    src="https://my.spline.design/distortingtypography-0249d79b86b112088ea9b55a5504c997/"
                    width="100%"
                    height="100%"
                    className="w-full h-full"
                    title="Spline Typography"
                ></iframe>
            </div>
            {/* <p>This is the sidebar content</p> */}

            {/* Iframe for displaying content */}
            {/* <div className="iframe-container mt-4">
                <iframe

                    src="https://my.spline.design/distortingtypography-0249d79b86b112088ea9b55a5504c997/"
                    width="100%"
                    height="100%"
                    className="w-full h-full"
                    title="Spline Typography"
                ></iframe>
                
            </div> */}

        </motion.div>


    </div>
);
};

export default Sidebar;