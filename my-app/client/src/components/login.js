import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css"; // Ensure this path is correct

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // For error messages
    const navigate = useNavigate(); // Use navigate for redirecting

    const handleLogin = async (e) => {
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
            console.log(data); // Handle the response from your backend
            navigate("/"); // Redirect to dashboard on successful login
        } else {
            setError(data.error || "Login failed. Please check your credentials."); // Set the error message
        }
    };
    
    return (
        <div className="wrapper signIn">
            <div className="form">
                <div className="heading">LOGIN</div>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>} {/* Display error message */}
                <form onSubmit={handleLogin}>
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
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
