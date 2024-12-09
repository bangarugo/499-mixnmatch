import React from "react";
import '../styles/profile.css';
import profileImage from '../images/profile.jpeg';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons'; 
import { motion } from 'framer-motion';
import Navbar from '../components/NavBar';

const Profile = () => {
const [userName, setUserName] = useState("");

  useEffect(() => {
    // Fetch user data from the server
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/profile", {
          withCredentials: true, 
        });
        const user = response.data.user;
        setUserName(user.firstName || "Guest");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserName("Unauthorized User");
      }
    };

    fetchUserData();
  }, []);


    return (
      <div className="Navbar">
      <Navbar />
      <div className="profile-card-content">
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
          
    
          >@{userName}</motion.h1>
          <p></p>
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
      </div>
      </div>


    );
  };
  
  export default Profile;
  
