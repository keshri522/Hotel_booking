import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav bg-light d-flex justify-content-evenly">
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/Login">
        Login
      </Link>
      <Link className="nav-link" to="/Register">
        Register
      </Link>
    </nav>
  );
};

export default Nav;
