import React from "react";

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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BootstapCard;
