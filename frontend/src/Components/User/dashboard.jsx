import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DashboardNav from "../dashboardNav";
import ConnectNav from "../ConnectNav";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus } from "@fortawesome/free-solid-svg-icons";
const Dashboard = () => {
  const navigate = useNavigate();
  // need to check this is protected routes only login user can access this routes
  const User = useSelector((state) => state.rootReducers.userLogin);
  useEffect(() => {
    // Check if token is present, then move to /dashboard, otherwise navigate to /login
    if (User && User.token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [User, navigate]);

  // if no user or no token is present instead of return the whole componets simply return the null
  if (!(User && User.token)) {
    return null;
  }

  return (
    <>
      <div className="container-fluid bg-secondary p-3 text-center">
        <ConnectNav></ConnectNav>
      </div>
      <div className="container-fluid p-4">
        <DashboardNav></DashboardNav>
      </div>
      <div className="container-fluid">
        {/* need to show a button click on that show the hotels */}
        <div className="row mt-4">
          <div className="col-md-6 offset-md-3 text-center">
            <FontAwesomeIcon
              className="h2"
              icon={faHouse}
              fade
            ></FontAwesomeIcon>
            <p className="lead">You can add hotels or post new hotels</p>

            <Link to="/hotels/new" className="btn btn-primary">
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
              <span style={{ fontWeight: "bold" }}> Hotels </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
