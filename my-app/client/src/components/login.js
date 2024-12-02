import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import backgroundImage from "../images/background.jpeg";
import '../styles/login.css';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate(); // Use navigate for redirecting

  // const loginStyle = {
  //   height: "100vh", // Full viewport height
  //   width: "100vw", // Full viewport height
  //   backgroundImage: `url(${backgroundImage})`, // Set the background image
  //   backgroundSize: "cover", // Cover the entire area
  //   backgroundPosition: "center", // Center the image
  //   display: "flex", // Center content
  //   justifyContent: "center", // Center horizontally
  //   alignItems: "center", // Center vertically
  // };

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent the form from refreshing the page

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        console.log(data); 
        navigate("/profile"); // Redirect to profile page on successful login
      } else {
        // if response is not okay, set the error message from the backend
        setError(data.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later."); 
    }
  };

  return (
    <div >
      {/* Apply the loginStyle here */}
      <div className="page-background"></div>
      <div className="form">
        <motion.div 
        className="heading"
        initial = {{ 
          x:-100,
          opacity: 0
        }}
        animate = {{
          x: 0,
          opacity: 1
        }}
        transition={{
          ease: "circInOut",
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        whileHover={{
          textShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)'
        }}
        >LOGIN</motion.div>
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}{" "}
        {/* Display error message */}
        <form onSubmit={handleLogin}>
          <div>
            <motion.label 
            htmlFor="e-mail"
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
            >E-Mail</motion.label>
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
            <motion.label 
            htmlFor="password"
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
            >Password</motion.label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <motion.button 
          className="submit"
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
          >Submit</motion.button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;