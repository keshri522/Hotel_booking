import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DateFunctions from "../Functions/Date";
import { useNavigate } from "react-router-dom";
import GetsingleHotel from "../Functions/getsinglehotels";
import moment from "moment";
const ShowmoreDetails = () => {
  const navigate = useNavigate();
  const User = useSelector((state) => state.rootReducers.userLogin); // this will give the current logged in user
  const [hotelId, setHotelId] = useState(null); // keep the track of the hotels id basded on that id i will make request to the backend
  const [hotels, Sethotles] = useState([]);
  const [show, Setshow] = useState(false);

  const getId = () => {
    // this function will get the id of hotels from local
    let ids = localStorage.getItem("hotelId");
    // console.log(JSON.parse(ids));
    setHotelId(JSON.parse(ids));
  };
  // calling the function
  useEffect(() => {
    getId();
  }, [User, hotelId]);

  // making a request to backend to get the single hotel
  useEffect(() => {
    if (hotelId) {
      Setshow(true);
      GetsingleHotel(User.token, hotelId).then((res) => {
        if (res.status === 200) {
          Sethotles(res.data);
          // console.log(res.data);
        }
        setTimeout(() => {
          Setshow(false);
        }, 1000);
      });
    }
  }, [hotelId, navigate, User]);
  // console.log(hotels);
  return (
    <>
      <div className="container_fluid p-4 m-1 bg-secondary text-center">
        <h2>{hotels.title}</h2>
      </div>
      {show ? (
        <div className="container text-center mt-5">
          <h1 className="text-danger">...loading</h1>
          <p className="texts">Have patience Server might be slow!</p>
        </div>
      ) : (
        <div className="container mt-4 card">
          <div className="row">
            {hotels.images ? (
              <div className="col-md-6">
                <img
                  src={hotels.images}
                  alt="hotel-images"
                  className="img  img-fluid mt-2"
                />
              </div>
            ) : (
              ""
            )}
            <div className="col-md-6">
              <b>{hotels.content}</b>
              <p className="alert alert-info mt-3">Price: ${hotels.price}</p>
              <p className="card-text texts">
                for <span></span>
                <span className="text-primary ">
                  {/* this function will show the diffrence between from and to date in days */}
                  {DateFunctions(hotels.fromDate, hotels.toDate)}
                  {DateFunctions(hotels.fromDate, hotels.toDate) <= 1
                    ? " day "
                    : " days "}
                </span>
                <p>
                  From <br />
                  {/* here im am fromating the date with the help of moments libaray */}
                  {moment(new Date(hotels.fromDate)).format(
                    "MMM DD YYYY, HH:mm:ss a"
                  )}
                  <br />
                  To <br />
                  {/* here im am fromating the date with the help of moments libaray */}
                  {moment(new Date(hotels.toDate)).format(
                    "MMM DD YYYY, HH:mm:ss a"
                  )}
                </p>
              </p>
              <h6>
                <span className="text-primary ">PostedBy:</span>{" "}
                {hotels.postedBy.name}
              </h6>
              <button className="btn btn-outline-success w-100">
                Book Hotel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowmoreDetails;
