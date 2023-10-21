import React from "react";
import Home from "../booking/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../User/dashboard";
import Seller from "../User/seller";
import { Route, Routes } from "react-router-dom";
const Paths = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/seller" element={<Seller />}></Route>
      </Routes>
    </div>
  );
};

export default Paths;
