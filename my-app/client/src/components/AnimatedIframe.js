import React from "react";
import { motion } from "framer-motion";
// import "../styles/AnimatedIframe.css";

const AnimatedIframe = () => {
    const iframeSrc = "https://my.spline.design/distortingtypography-0249d79b86b112088ea9b55a5504c997/";
    const encodedUrl = encodeURIComponent(iframeSrc); // Encode the URL
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="iframe-container"
        >
            <iframe
                src={encodedUrl}
                width={"100%"}
                height={"100%"}
                title="Animated Typography"
            >
                </iframe>

            </motion.div>
    );
};

export default AnimatedIframe;