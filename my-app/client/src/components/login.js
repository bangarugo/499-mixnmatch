import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '../images/background.jpeg';

const Login = ({ handleLogin }) => { // Accept handleLogin as a prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // For error messages
    const navigate = useNavigate(); // Use navigate for redirecting

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

    const handleLoginSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page

        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json(); // Parse the JSON response
        if (response.ok) {
            handleLogin(); // Call handleLogin to update auth state
            navigate("/"); // Redirect to dashboard on successful login
        } else {
            setError(data.error || "Login failed. Please check your credentials."); // Set the error message
        }
    };

    return (
        <div style={loginStyle}>
            <div className="form">
                <div className="login-form heading">LOGIN</div>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <form onSubmit={handleLoginSubmit}>
                    <div className="login-form label">
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
                    <div className="login-form label">
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
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
