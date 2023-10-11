import React, { Component } from "react";
import NavBar from "./components/navbar";
import Posts from "./components/posts";
import Home from "./components/home";
import ProductRoute from "./routes/productsRoute";
import AdminRoute from "./routes/adminRoute";
import NotFound from "./components/notFound";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

// refactor product routes
// usenavigate, uselocation in ./notfound
// useSearchParams in ./products

const App = () => {
  const location = useLocation(); // for all routes
  console.log(location)
  return (
    <div>
      <NavBar />
      <div className="content">
        <>
            {location.state}
          <Routes>
            <Route path="/posts" element={<h1>Extra content</h1>} />
          </Routes>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:year/:month" element={<Posts />} />
            <Route path="/products/*" element={<ProductRoute />} />
            <Route path="/admin/*" element={<AdminRoute />} />
            <Route path="*" element={<NotFound />} errorMsg={"404 not found"}/>
          </Routes>
        </>
      </div>
    </div>
  );
};

export default App;
