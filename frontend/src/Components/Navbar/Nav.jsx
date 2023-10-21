import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedOutUser } from "../Redux/reducers/LoginUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faDashcube,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserData = useSelector((state) => state.rootReducers.userLogin);
  // console.log(UserData);
  return (
    <nav className="nav bg-light d-flex justify-content-around">
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
      {UserData && UserData.User && UserData.User.email ? (
        <Link style={{ fontSize: "1.5rem" }}>
          <FontAwesomeIcon
            icon={faLinkedin}
            onClick={() => {
              window.open(
                "https://www.linkedin.com/in/rahul-keshri-814bb8221",
                "_blank"
              );
            }}
          />
        </Link>
      ) : (
        <Link className="nav-link" to="/Register">
          Register
        </Link>
      )}

      <Link style={{ fontSize: "1.5rem" }}>
        <FontAwesomeIcon
          icon={faDashcube}
          onClick={() => {
            window.open("https://keshri522.github.io/Myportfolio/", "_blank");
          }}
        />
      </Link>
      <Link style={{ fontSize: "1.5rem" }}>
        <FontAwesomeIcon
          icon={faGithub}
          onClick={() => {
            window.open("https://github.com/keshri522", "_blank");
          }}
        />
      </Link>
    </nav>
  );
};

export default Nav;
