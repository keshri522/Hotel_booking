import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedOutUser } from "../Redux/reducers/LoginUser";
const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserData = useSelector((state) => state.rootReducers.userLogin);
  // console.log(UserData);
  return (
    <nav className="nav bg-light d-flex justify-content-evenly">
      <Link className="nav-link" to="/">
        Home
      </Link>
      {UserData && UserData.User && UserData.User.email ? (
        <Link
          to="/"
          className="nav-link"
          onClick={() => {
            // need to remove the local storage and redux as well then redirects to home page
            localStorage.removeItem("LoginUser");
            dispatch(loggedOutUser(""));
            // navigating to desired page
          }}
        >
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
