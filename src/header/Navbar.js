import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img
            className="navbar-logo-image"
            src="/images/logo.png"
            alt="TéléNÉ"
          />
        </Link>
      </div>
      <div className="navbar-search">
        <Search />
      </div>
      <div style={{ clear: "both" }} />
    </nav>
  );
};

export default Navbar;
