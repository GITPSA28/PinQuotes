import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateQuote from "./pages/CreateQuote";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { LoginContext } from "./contexts/LoginContext";
import NavBar from "./components/NavBar";
import { useState } from "react";
function App() {
  const [isLogedIn, setIsLogedIn] = useState(() => {
    return "true" === localStorage.getItem("isSignedIn");
  });

  return (
    <Router>
      <LoginContext.Provider value={{ isLogedIn, setIsLogedIn }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/createquote" element={<CreateQuote />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
