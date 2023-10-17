import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/navbar";
import Login from "./components/login";
import Home from "./components/home";
import "./App.css";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </>
  );
};

export default App;
