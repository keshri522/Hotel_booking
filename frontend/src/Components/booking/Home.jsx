import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../Redux/reducers/LoginUser";
import { useSelector } from "react-redux";
import Gethotels from "../Functions/GetHotles";
const Home = () => {
  const [hotels, Sethotles] = useState([]);
  const dispatch = useDispatch();

  // calling this function in useeffect
  useEffect(() => {
    Gethotels()
      .then((res) => {
        Sethotles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>{JSON.stringify(hotels)}</div>;
};

export default Home;
