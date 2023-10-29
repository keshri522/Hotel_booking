import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../dashboardNav";
import ConnectNav from "../ConnectNav";
import { toast } from "react-toastify";
import LoginUserHotels from "./../Functions/UserBookedhotels";
// this will show spinner based on the response

const Seller = () => {
  const [hotels, setHotels] = useState([]);

  const navigate = useNavigate();
  // need to check this is protected routes only login user can access this routes
  const User = useSelector((state) => state.rootReducers.userLogin);

  useEffect(() => {
    // Check if token is present, then move to /dashboard, otherwise navigate to /login
    if (User && User.token) {
      navigate("/seller");
    } else {
      navigate("/login");
    }
  }, [User, navigate]);
  // making a api call to find all the hotels based on login user
  useEffect(() => {
    LoginUserHotels(User.token)
      .then((res) => {
        setHotels(res.data);
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response.data.message);
      });
  }, [User, navigate]);
  // i want if there is no user and no token then no need to render or retun the componets it throw error so
  if (!(User && User.token)) {
    return null;
  }

  return (
    <>
      <div className="container-fluid bg-secondary p-3 text-center ">
        <ConnectNav></ConnectNav>
      </div>
      <div className="container-fluid p-4">
        <DashboardNav></DashboardNav>
      </div>
    </>
  );
};

export default Seller;
