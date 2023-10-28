import React from "react";
import DateFunctions from "../Functions/Date";
const BootstapCard = ({ hotel }) => {
  //   console.log(hotel);
  // using bootstrap card class to shows

  return (
    <>
      <div className=" m-3 card">
        <div className="row no-gutters">
          <div className="col-md-4 ">
            {hotel.images ? (
              <img
                className="card-image imageStyle img img-fluid"
                src={hotel.images}
                alt="hotel_image"
              />
            ) : (
              <img
                className="card-image imageStyle img img-fluid"
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BootstapCard;
