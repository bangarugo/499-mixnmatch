import React, { useState, useEffect } from "react";
import '../styles/profile.css';
import defaultProfilePic from '../images/defaultpp.png'; // Placeholder image

const Profile = ({ userId }) => {
    const [profilePic, setProfilePic] = useState(defaultProfilePic);

    useEffect(() => {
        // Fetch the user's profile picture from the backend
        const fetchProfilePic = async () => {
            try {
                const response = await fetch(`http://localhost:8080/users/${userId}/profile-picture`);
                if (!response.ok) {
                    throw new Error("Failed to fetch profile picture");
                }
                const data = await response.json();
                if (data.profilePic) {
                    setProfilePic(`http://localhost:8080/${data.profilePic}`); // Set the fetched profile picture
                }
            } catch (error) {
                console.error("Failed to fetch profile picture", error);
            }
        };

        fetchProfilePic();
    }, [userId]);

    const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profilePicture", file);

        try {
            const response = await fetch(`http://localhost:8080/users/${userId}/upload-profile-picture`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setProfilePic(`http://localhost:8080/${data.profilePic}`); // Update the profile picture with the new image
            } else {
                console.error("Failed to upload profile picture");
            }
        } catch (error) {
            console.error("Error uploading profile picture", error);
        }
    };

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
                <div className="profile-picture">
                    <img 
                        src={profilePic} 
                        alt="Profile" 
                        className="profile-pic" 
                        onClick={() => document.getElementById('fileInput').click()} 
                    />
                    <input 
                        type="file" 
                        id="fileInput" 
                        style={{ display: "none" }} 
                        onChange={handleProfilePicChange} 
                        accept="image/*"
                    />
                </div>
            </div>

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
