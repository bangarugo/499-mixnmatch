import React from "react";
import '../styles/profile.css';
import profileImage from '../images/profile.jpeg';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons'; 
import { motion } from 'framer-motion';

const Profile = () => {
    return (
      <div className = "user-box">
      <div className="user-form">
      <div className="profile-icon" onClick={() => document.getElementById('input').click()}>
        <img src = {profileImage} alt="Profile-pic" className="Profile-pic"></img>

        <div className="embedded-camera-icon">
          <FontAwesomeIcon icon={faImage} />
          </div>

          <input type = "file" 
          accept = "image/jpeg, image/jpg, image/png, image/webp" 
          id = "input" 
          className = "input-file"></input>
      </div>
        <div className="user-info">
          <motion.h1
            initial = {{ 
              x:-100,
              opacity: 0
            }}
            animate = {{
              x: 0,
              opacity: 1
            }}
            transition={{
              ease: "circInOut"
            }}
          
    
          >STEPHANIE NJOKU</motion.h1>
          <p>@stephanie</p>
          <div className="badges-section"></div>
          <motion.button 
          className="show-badges-button"
          whileHover={{
            scale: 1.15
          }}
          whileTap={{
            scale: 0.85,
            rotate: "-2.5deg"
          }}
          transition={{
            duration: 0.125,
            ease: "easeInOut"
          }}
          >Show Badges</motion.button>
          <div className="badges-box">
            <div className="badge">Style Explorer</div>
            <div className="badge">Closet Organizer</div>
            <div className="badge">Trendsetter</div>
            <div className="badge">Mix Master</div>
          </div>
        </div>
        </div>
        <Link to="/login" className="logout-button">Logout</Link>

        
      </div>
    );
  };
  
  export default Profile;
  