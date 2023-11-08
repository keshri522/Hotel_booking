import React, { useState } from "react";

const OTPVerificationForm = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [show, Setshow] = useState(true);
  const handleChange = (e, index) => {
    const { value } = e.target;
    // first need to grasp all the previous values
    const PrevValue = [...otp]; //  spread the origan values
    PrevValue[index] = value; // based on the index it will add the value
    setOtp(PrevValue);
  };

  let item = otp.join(""); // combining into one will be send to backend for verification usin mongo db

  return (
    <div className="container margin">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card ">
            <div className="card-body">
              <h5 className="card-title text-center mb-4"> Verify OTP </h5>
              <div className="d-flex justify-content-center ">
                {otp.map((value, index) => (
                  <input
                    style={{ border: "1px solid blue" }}
                    key={index}
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    maxLength="1"
                    className=" form-control m-2"
                  />
                ))}
              </div>
              {show ? (
                <button className="btn btn-primary w-100 mt-3">
                  Verify OTP
                </button>
              ) : (
                <button className="btn btn-success w-100 mt-3">
                  ...Verifying
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationForm;
