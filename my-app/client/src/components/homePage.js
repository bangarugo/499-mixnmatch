import React from "react";
import { Link } from "react-router-dom";
import '../styles/homePage.css';
// import background from '../images/background-image.jpeg';
import closet from '../images/purple-closet.jpg';

const HomePage = () => {
    return (
        <div className="homepage">
            <nav className="navbar">
                {/* <img src={background} className="homepage-background" alt="background" /> */}
                <div className="navbar-links">
                    <Link to="/home">Home</Link>
                    <Link to="/closet">Closet</Link>
                    <Link to="/outfits">Outfits</Link>
                    <Link to="/profile">Profile</Link>
                </div>
            </nav>

            <div className="background-text">
                <h1>MIX N' MATCH</h1>
            </div>

            <div className="homepage-slogan">
                <p>Your Style</p>
                {/* <p>Your Way</p> */}
                <img src={closet} className="slogan-image" alt="closet" /> 
                <p>Your Way</p>
            </div>

            {/* <img src={closet} className="slogan-image" alt="closet" />  */}

            <div className="info-section">
                <div className="info-box">
                    <h2>Virtual Closet</h2>
                    <p>Digitize your wardrobe and access it anytime, anywhere.</p>  
                </div>
            {/* </div> */}
            {/* <div className="info-section"> */}
                <div className="info-box">
                    <h2>AI Stylist</h2>
                    <p>Get personalized putfit recommendations based on your style and occasions.</p>
                {/* </div> */}

                </div>
            </div>
            
        </div>
    );
};

export default HomePage;
