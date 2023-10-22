import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DashboardNav from "../dashboardNav";
import ConnectNav from "../ConnectNav";
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
        <div className="row">
          <div className="col-md-10">
            <h1>Your Booking</h1>
          </div>
          <div className="col-md-2">
            <Link className="btn btn-primary">Show Hotels</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
