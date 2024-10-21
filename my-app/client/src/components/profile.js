import React from "react";
import '../styles/profile.css';

const Profile = () => {
    return (
      <div className="container">
        <div className="profile-background">
          <h1 className="title">MIX N' MATCH</h1>
        </div>
  
        <nav className="navbar">
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/closet">Closet</a></li>
            <li><a href="/outfits">Outfits</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </nav>
  
        <div className="profile-section">
          <div className="profile-picture"></div>
        </div>
        {/* Links for each nav button will be added soon */}
        <div className="icon-buttons">
          <div className="icon-button home-icon"></div>
          <div className="icon-button outfit-icon"></div>
          <div className="icon-button closet-icon"></div>
        </div>
  
        <div className="badges">
          <h3>Badges Earned</h3>
          <div className="badges-grid">
            <div className="badge">Style Explorer</div>
            <div className="badge">Closet Organizer</div>
            <div className="badge">Trendsetter</div>
            <div className="badge">Mix Master</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Profile;
  