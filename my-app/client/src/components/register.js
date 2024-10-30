import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '../images/background.jpeg';
import '../styles/signup.css'; // Ensure this path is correct

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // For error messages
    const navigate = useNavigate(); // Use navigate for redirecting

    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page

        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json(); // Parse the JSON response

        if (response.ok) {
            console.log(data); // Handle the response from your backend
            navigate("/login"); // Redirect to login on successful signup
        } else {
            setError(data.error || "Signup failed. Please try again."); // Set the error message
        }
    };

    const loginStyle = {
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
        backgroundImage: `url(${backgroundImage})`, // Set the background image
        backgroundSize: 'cover', // Cover the entire area
        backgroundPosition: 'center', // Center the image
        display: 'flex', // Center content
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
    };

    return (
        <div style={loginStyle}> {/* Apply the loginStyle here */}
            <div className="form">
                <div className="heading">SIGN UP</div>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>} {/* Display error message */}
                <form onSubmit={handleSignup}>
                    <div className="label">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="label">
                        <label htmlFor="e-mail">E-Mail</label>
                        <input
                            type="email"
                            id="e-mail"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="label">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <p className="signup-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
