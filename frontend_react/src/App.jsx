import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import HomePage from "./views/HomePage";
import Login from "./views/Login-up/Login-up";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
