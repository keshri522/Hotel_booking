import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
const StripeSuccess = () => {
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
                  color="green"
                  icon={faCheckCircle}
                ></FontAwesomeIcon>
                <p className="card-text">
                  Your payment has been processed successfully.
                </p>
                <Link to="/" className="btn btn-outline-primary">
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

export default StripeSuccess;
