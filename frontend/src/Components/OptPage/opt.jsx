import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(""); // this is the state in which i am sending tht opt to backend for verify using mongdb
  const foucsref = useRef(null); // dircectly change the dom like foucusing
  // getting the token from redux because this is protected routes only loged in user cann acces this page if user enter the routes manually hje will not access
  const User = useSelector((state) => state.rootReducers.userLogin); // getting token from redux

  useEffect(() => {
    if (User && User.token) {
      navigate("/optverification");
      foucsref.current.focus(); // this will foucs the input filed when ever user to go this page
    } else {
      navigate("/login");
    }
  }, [navigate, User]);
  const handleChange = (e) => {
    // this functinn handle the change in the opt fielss
    setOtp(e.target.value);
    // console.log(e.target.value); // juist for debugging
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to verify OTP here
    // console.log("Verifying OTP:", otp); // just for debugging
  };
  if (!(User && User.token)) {
    // if there is no token then no need to go further simply return the null
    return null;
  }
  return (
    <div className="container mt-5">
      <div className="row center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">OTP Verification</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleChange}
                    ref={foucsref}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Verify OTP
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
