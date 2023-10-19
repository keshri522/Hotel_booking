import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../Redux/reducers/LoginUser";
import { useSelector } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
};

export default Home;
