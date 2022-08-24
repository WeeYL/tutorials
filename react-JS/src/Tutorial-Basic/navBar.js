import React from "react";

const NavBar = (props) => {
  const { numOfCounters } = props;

  return (
    <nav className="navbar navbar-expand-lg navbar-da bg-dark">
      <a className="navbar-brand" href="#">
        {numOfCounters === 1
          ? `${numOfCounters} counter`
          : `${numOfCounters} counters`}{" "}
      </a>
    </nav>
  );
};

export default NavBar;
