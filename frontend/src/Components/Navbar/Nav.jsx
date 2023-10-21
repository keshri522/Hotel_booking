import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const UserData = useSelector((state) => state.rootReducers.userLogin);
  // console.log(UserData);
  return (
    <nav className="nav bg-light d-flex justify-content-evenly">
      <Link className="nav-link" to="/">
        Home
      </Link>
      {UserData && UserData.User && UserData.User.email ? (
        <Link className="nav-link" to="/Login">
          Logout
        </Link>
      ) : (
        <Link className="nav-link" to="/Login">
          Login
        </Link>
      )}
      <Link className="nav-link" to="/Register">
        Register
      </Link>
    </nav>
  );
};

export default Nav;
