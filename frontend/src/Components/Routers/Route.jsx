import React from "react";
import Home from "../booking/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../User/dashboard";
import Seller from "../User/seller";
import NewHotels from "../Hotels/New";
import { Route, Routes } from "react-router-dom";
import EditHotels from "../auth/EditHotels";
import ShowmoreDetails from "./../HotelDetails/showmore";
import StripeSuccess from "../auth/StripeSuccess";
import Stripeerror from "../auth/StripeError";
import OTPVerification from "../OptPage/opt";
import InputComponent from "../Optverification/optverification";
import ForgotPassword from "../Froms/ForgotPassword";
import UpdatePassword from "../Froms/UpdatePassword";
const Paths = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/seller" element={<Seller />}></Route>
        <Route path="/hotels/new" element={<NewHotels />}></Route>
        <Route path="/details/:slug" element={<ShowmoreDetails />}></Route>
        <Route path="/seller/edit/:slug" element={<EditHotels />}></Route>
        <Route path="/success" element={<StripeSuccess />}></Route>
        <Route path="/error" element={<Stripeerror />}></Route>
        <Route path="/optverification" element={<OTPVerification />}></Route>
        <Route path="/optverified" element={<InputComponent />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/updatepassword" element={<UpdatePassword />}></Route>
      </Routes>
    </div>
  );
};

export default Paths;
