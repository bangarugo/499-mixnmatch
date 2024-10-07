import React from "react";
import '../styles/homePage.css';
import logo from '../images/ETF-image.jpg';

const HomePage = () => {
    return (
        <div className="home-page">
            <header className="home-page-header">
                <h1>Welcome to ET-FOLIO</h1>
                <img src={logo} className="home-page-logo" alt="logo" />
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