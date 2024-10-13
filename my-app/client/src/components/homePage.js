import React from "react";
import '../styles/homePage.css'; // Make sure this path is correct
import logo from '../images/ETF-image.jpg'; // Ensure the logo path is correct

const HomePage = () => {
    return (
        <div className="homepage">
            <header className="homepage-header">
                <h1>Welcome to ET-FOLIO</h1>
                <img src={logo} className="homepage-logo" alt="logo" />
                <h1>Simplifying ETF Investing for Beginners</h1>
            </header>

            <section className="info-bubbles">
                <div className="bubble">
                    <h2>Personalized Recommendations</h2>
                </div>
                <div className="bubble">
                    <h2>Educational Resources</h2>
                </div>
                <div className="bubble">
                    <h2>Easiest Way to get a headstart on your portfolio</h2>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
