import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import HomePage from './components/homePage'; // Importing HomePage component 
import Login from './components/login'; // Importing Login component 
import Register from './components/register'; // Importing Register component 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} /> {/* Route for homepage */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
            </Routes>
        </Router>
    );
};

export default App;
