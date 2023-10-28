import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../Redux/reducers/LoginUser";
import { useSelector } from "react-redux";
import Gethotels from "../Functions/GetHotles";
import BootstapCard from "../Cards/bootstapCard";
import Spinner from "./../Spinner/spinner";
const Home = () => {
  const [hotels, Sethotles] = useState([]);
  const [show, Setshow] = useState(true); // Set show to true initially
  const dispatch = useDispatch();

  useEffect(() => {
    Gethotels()
      .then((res) => {
        Sethotles(res.data);
        Setshow(false); // Set show to false after data is fetched
      })
      .catch((err) => {
        console.log(err);
        Setshow(false); // Set show to false in case of error
      });
  }, []);

  return (
    <>
      <div className="container-fluid  text-center mt-1 p-3 bg-secondary">
        <h2 className="text-white">All Hotels</h2>
      </div>
      <div className="container">
        {show ? (
          <div className="load">
            <h3 className="text-danger">...loading</h3>
          </div>
        ) : (
          hotels.map((hotel) => (
            <BootstapCard key={hotel._id} hotel={hotel}></BootstapCard>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
