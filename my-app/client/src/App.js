import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import HomePage from './components/homePage'; // Importing HomePage component 
import Login from './components/login'; // Importing Login component 
import Register from './components/register'; // Importing Register component 
import Profile from './components/profile'; {/* import for profile page */}

const App = () => {
    return (
        
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} /> {/* Route for homepage */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
};

export default App;
