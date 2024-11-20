import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/welcome.css';

export default function WelcomePage(){
    const words = ["ARE YOU READY ?", "EXPRESS YOUR WORLD", "EXPLORE YOUR CREATIVITY", "LET'S GO !"];
    const [word, setWords] = useState(0);
    const navigate = useNavigate(); 

    useEffect(() => {
        const interval = setInterval(()=> {
            setWords((prev) => (prev+1) % words.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

            if (scrollY >= pageHeight - 100) {
                navigate('/home'); // Navigate to the home page when near the bottom
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [navigate]);

    return(
        <div className="welcome-container">
            <AnimatePresence mode = "wait">
            <motion.h1 
            key = {words[word]}
            initial = {{ opacity : 0, y: -50}}
            animate = {{ opacity: 1, y: 0}}
            transition={{
                duration: 0.5,
            }}
            exit={{
                opacity:0, y:50
            }}
            className = "text-white text-center text-[100px] font-bold"
            >
             {words[word]}
             </motion.h1>

            </AnimatePresence>
            
        </div>

    );
    
}