import React from "react";
import DateFunctions from "../Functions/Date";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
const BootstapCard = ({ hotel, handleDelete }) => {
  const navigate = useNavigate();
  //   console.log(hotel);
  // using bootstrap card class to shows

  return (
    <>
      <div className=" m-3 card">
        <div className="row no-gutters">
          <div className="col-md-4 ">
            {hotel.images ? (
              <img
                className="card-image imageStyle img img-fluid h-100"
                src={hotel.images}
                alt="hotel_image"
              />
            ) : (
              <img
                className="card-image imageStyle img img-fluid h-100"
                src="https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg"
                alt="default_image"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title text-primary ">
                {hotel.title}
                <span className="text-danger"> {`$${hotel.price}`}</span>
              </h5>
              <p className="alert alert-info">{hotel.location}</p>
              <p className="card-text texts  ">{`${hotel.content.substring(
                0,
                200
              )}...`}</p>
              <p className="card-text texts">
                for <span></span>
                <span className="text-primary ">
                  {/* this function will show the diffrence between from and to date in days */}
                  {DateFunctions(hotel.fromDate, hotel.toDate)}
                  {DateFunctions(hotel.fromDate, hotel.toDate) <= 1
                    ? " day "
                    : " days "}
                </span>
              </p>
              <p className="cart-text">
                Available from {new Date(hotel.fromDate).toLocaleDateString()}
              </p>

              <div className="row d-flex justify-content-between">
                <div className="col-md-4 mb-2 mb-md-0">
                  <button
                    onClick={() => {
                      navigate(`details/${hotel.title.split(" ").join("")}`, {
                        state: { data: hotel }, // sending the data of particular hotel
                      }); // removes spaces
                    }}
                    className="btn btn-outline-success w-100"
                  >
                    show more
                  </button>
                </div>
                <div className="col-md-4 mb-2 mb-md-0">
                  {/* showing two more button one for update second is for delete the hotels but these are visible only if that login user create the hotes hotels can be deeltd by those who created hotels */}
                  <button
                    onClick={() => {
                      navigate(`edit/${hotel.title.split(" ").join("")}`, {
                        state: { data: hotel }, // sending the data of particular hotel
                      }); // removes spaces
                    }}
                    className="btn btn-outline-warning w-100"
                  >
                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                  </button>
                </div>
                <div className="col-md-4 mb-2 mb-md-0">
                  {/* showing two more button one for update second is for delete the hotels but these are visible only if that login user create the hotes hotels can be deeltd by those who created hotels */}
                  <button
                    onClick={() => {
                      handleDelete(hotel._id); // sending the id to the parent compoents
                    }}
                    className="btn btn-outline-danger w-100 "
                  >
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BootstapCard;
