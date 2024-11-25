import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FullScreenPages = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(0); // State to keep track of the current page
    const pages = [
        {
            id: 0,
            content: (
                <iframe
                src="https://my.spline.design/distortingtypography-0249d79b86b112088ea9b55a5504c997/"
                className="w-full h-full"
                title="Page 1 - SPline"
                ></iframe>
            ),
        },
        {
            id: 1,
            content: <div>Page 2</div>,
        },
    ];

    const slideTo = (direction) => {
        if (direction === "next") {
            setCurrentPage((prev) => (prev + 1) % pages.length);
        } else {
            setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
        }
    };

    return (
        <div className="w-screen h-screen overflow-hidden relative">
            {/* Navigation Buttons */}
            <button
                onClick={() => slideTo("prev")}
                className="absolute top-4 left-1/2 transform -translate-x-1/2 p-4 bg-gray-800 text-white"
                disabled={currentPage === 0}
            >
                Slide Up

            </button>
        </div>

    )
};

export default FullScreenPages;