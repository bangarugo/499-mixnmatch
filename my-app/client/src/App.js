import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./components/login"; 
import Register from "./components/register"; 
import MainPage from "./pages/MainPage"; 
import Profile from "./components/profile"; 
import NavBar from "./components/NavBar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  // Handles user login (could add token storage logic here)
  const handleLogin = () => {
    setIsAuthenticated(true);
  
  };

  // Handles user logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  ;
  };

  return (
    <Router>
      {/* Pass isAuthenticated and handleLogout to NavBar */}
      <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        {/* Main page, can be accessed regardless of authentication */}
        <Route 
          path="/" 
          element={<MainPage isAuthenticated={isAuthenticated} />} 
        />

        {/* Login page, pass handleLogin for successful login handling */}
        <Route 
          path="/login" 
          element={<Login handleLogin={handleLogin} />} 
        />

        {/* Registration page */}
        <Route 
          path="/register" 
          element={<Register />} 
        />

        {/* Profile page, protected route - redirects to login if not authenticated */}
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
