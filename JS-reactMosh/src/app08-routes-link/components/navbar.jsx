import React from "react";
import { Link, NavLink } from "react-router-dom";

// replace > back button

const NavBar = () => {
  function isActive({ isActive }) {
    return isActive ? { color: "red" } : {};
  }

  return (
    <ul>
      <li>
        <NavLink style={isActive} to="/" state="hello from navbar > home">
          Home
        </NavLink>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/admin" reloadDocument> Admin </Link>
      </li>
    </ul>
  );
};

export default NavBar;
