import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img className="logo-image" src="/images/logo.png" alt="TéléNÉ" />
        </Link>
      </div>
      <div className="search-bar">
        <Search />
      </div>
      <div style={{ clear: "both" }} />
    </nav>
  );
};

export default Navbar;
