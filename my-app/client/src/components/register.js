import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '../images/background.jpeg';
import "../styles/signup.css"; // Ensure this path is correct

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // For error messages
    const [success, setSuccess] = useState(''); // For success messages
    const navigate = useNavigate(); // Use navigate for redirecting

    // Cleanup function to avoid setting state on an unmounted component
    useEffect(() => {
        return () => {
            setError('');
            setSuccess('');
        };
    }, []);

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
        width: '100vw', // Full viewport height
        backgroundImage: `url(${backgroundImage})`, // Set the background image
        backgroundSize: 'cover', // Cover the entire area
        backgroundPosition: 'center', // Center the image
        display: 'flex', // Center content
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
    };

    return (
        <div style={loginStyle}> {/* Apply the loginStyle here */}
            <div className="wrapper signUp">
                <div className="form">
                    <div className="heading">SIGN UP</div>
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>} {/* Display error message */}
                    {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>} {/* Display success message */}
                    <form onSubmit={handleSignup}>
                        <div>
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
                        <div>
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
                        <div>
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
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
