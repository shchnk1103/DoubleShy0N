import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomePage from "./views/Home/HomePage";
import Login from "./views/Login-up/Login-up";
import "./App.scss";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <HomePage
                  darkMode={darkMode}
                  onToggleDarkMode={toggleDarkMode}
                />
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
