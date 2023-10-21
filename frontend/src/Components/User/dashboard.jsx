import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  return (
    <>
      <div className="container-fluid bg-secondary p-3">
        <h1>User Dashboard</h1>
      </div>
      <div className="container">
        <h1>Hello container</h1>
      </div>
    </>
  );
};

export default Dashboard;
