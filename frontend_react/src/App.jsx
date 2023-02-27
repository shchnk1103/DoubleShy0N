import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HomePage from "./views/Home/HomePage";
import Login from "./views/Login-up/Login-up";
import "./App.scss";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const getInitialMode = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return true;
    } else {
      return false;
    }
  };
  const [darkMode, setDarkMode] = useState(getInitialMode());

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add("dark-mode");
    } else {
      htmlElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((pre) => {
      const newMode = !pre;
      return newMode;
    });
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
