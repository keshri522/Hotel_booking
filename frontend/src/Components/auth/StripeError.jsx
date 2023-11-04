import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
const Stripeerror = () => {
  return (
    <>
      <div className="container flexs ">
        <div className="row">
          <div className="col-md-12">
            <div className="card text-center">
              <div className="card-body">
                <FontAwesomeIcon
                  fade
                  size="4x"
                  color="red"
                  icon={faTimesCircle}
                ></FontAwesomeIcon>
                <p className="card-text">
                  Your payment has been declined try again later
                </p>
                <Link to="/" className="btn btn-outline-danger">
                  Continue Booking
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stripeerror;
