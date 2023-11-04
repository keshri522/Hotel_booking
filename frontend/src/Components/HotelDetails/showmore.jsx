import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DateFunctions from "../Functions/Date";
import { useNavigate } from "react-router-dom";
import GetsingleHotel from "../Functions/getsinglehotels";
import moment from "moment";
import StripeHotel from "../Functions/StripeHotek";
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
      GetsingleHotel(hotelId).then((res) => {
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
  // this functio will responsive for navigating user based on the routes // routes based login
  const handleClicked = async (e) => {
    e.preventDefault();
    try {
      if (User && User.token) {
        StripeHotel(User.token, hotels)
          .then((res) => {
            window.location.href = res.data.url; // the the stripe method url it will be sending from backend
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        navigate("/login", { state: { from: "/details/RoyalHotelMalls" } }); // sending the actul path if user login he will be redircted to this page
      }
    } catch (error) {
      // Handle any errors here
    }
  };

  return (
    <>
      <div className="container_fluid p-3 m-1 bg-secondary text-center">
        <h2>{hotels.title}</h2>
      </div>
      {show ? (
        <div className="container text-center mt-3">
          <h1 className="text-danger">...loading</h1>
          <p className="texts">Have patience Server might be slow!</p>
        </div>
      ) : (
        <div className="container mt-3 ">
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

            {hotels.content ? (
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
                  {hotels.postedBy ? hotels.postedBy.name : "Unknown User"}
                </h6>

                <button
                  onClick={handleClicked}
                  className="btn btn-outline-success w-100 mb-4"
                >
                  {/* added condtionlly showing of button based on token */}
                  {User && User.token ? "Book Hotel" : "Login to Book Hotel"}
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ShowmoreDetails;
