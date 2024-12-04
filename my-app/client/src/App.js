import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login"; // Importing Login component
import Register from "./components/register"; // Importing Register component
import MainPage from "./pages/MainPage";
import Welcome from "./components/welcome";
import Profile from "./components/profile"; //Importing Profile Page
import Closet from "./pages/ClosetPage";
import Whiteboard from "./pages/WhiteboardPage";

const App = () => {
  const [allClosetData, setAllClosetData] = useState(null);
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<Welcome />} />{" "}
        {/* Route for Welcome Page */}
        <Route path="/home" element={<MainPage />} />{" "}
        {/* Route for Main Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/closet"
          element={<Closet setAllClosetData={setAllClosetData} />}
        />
        <Route
          path="/whiteboard"
          element={<Whiteboard allClosetData={allClosetData} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
