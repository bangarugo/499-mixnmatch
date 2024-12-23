import React, { useEffect, useState } from "react";
import '../styles/profile.css';
import profileImage from '../images/profile.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons'; 
import { motion } from 'framer-motion';
import Navbar from '../components/NavBar';

const Profile = () => {
    const [user, logUser] = useState(null); 
    const navigate = useNavigate(); 

    // Fetch user from localStorage 
    useEffect(() => {
        const localuser = JSON.parse(localStorage.getItem("user"));
        if (!localuser) {
            navigate("/login"); 
        } else {
          logUser(localuser); 
        }
    }, [navigate]);

    
    if (!user) {
        return <p></p>;
    }

    return (
        <div className="Navbar">
            <Navbar />
            <div className="profile-card-content">
                <div className="user-box">
                    <div className="user-form">
                        <div className="profile-icon" onClick={() => document.getElementById('input').click()}>
                            <img src={profileImage} alt="Profile-pic" className="Profile-pic" />
                            <div className="embedded-camera-icon">
                                <FontAwesomeIcon icon={faImage} />
                            </div>
                            <input 
                                type="file" 
                                accept="image/jpeg, image/jpg, image/png, image/webp" 
                                id="input" 
                                className="input-file" 
                            />
                        </div>
                        <div className="user-info">
                            <motion.h1
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ ease: "circInOut" }}
                            >
                                @{user.email}
                            </motion.h1>
                            <p></p>
                            <motion.button 
                                className="show-badges-button"
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.85, rotate: "-2.5deg" }}
                                transition={{ duration: 0.125, ease: "easeInOut" }}
                            >
                                Show Badges
                                <span className="hover-text">Feature Coming Soon</span>
                            </motion.button>
                            {/* <div className="badges-box">
                                <div className="badge">Style Explorer</div>
                                <div className="badge">Closet Organizer</div>
                                <div className="badge">Trendsetter</div>
                                <div className="badge">Mix Master</div>
                            </div> */}
                        </div>
                    </div>
                    <Link to="/login" className="logout-button">Logout</Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
