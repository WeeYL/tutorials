import React, { Component } from "react";
import NavBar from "./components/navbar";
import Products from "./components/products";
import Posts from "./components/posts";
import Home from "./components/home";
import Dashboard from "./components/admin/dashboard";
import ProductDetails from "./components/productDetails";
import NewProduct from "./components/newProduct";
import AdminLayout from "./components/adminLayout";
import About from "./components/admin/about";
import Contact from "./components/admin/contact";
import NotFound from "./components/notFound";
import "./App.css";
import { Route, Routes } from "react-router-dom";

// AdminLayout <Outlet> function is make the elements static to all /admin
// AdminLayout UseOutletContext allow data to pass to its children

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          <>
            <Routes>
              <Route path="/posts" element={<h1>Extra content</h1>} />
            </Routes>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/posts/:year/:month" element={<Posts />} />
              <Route path="/products">
                <Route index element={<Products />} />
                <Route path="new" element={<NewProduct />} />
                <Route path=":id" element={<ProductDetails />} />
              </Route>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="contact" element={<Contact />} />
                <Route path="about" element={<About />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        </div>
      </div>
    );
  }
}

export default App;
