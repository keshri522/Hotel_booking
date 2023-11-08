import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OptApi from "../Functions/optverifcation";
import { toast } from "react-toastify";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(""); // this is the state in which i am sending tht opt to backend for verify using mongdb
  const foucsref = useRef(null); // dircectly change the dom like foucusing
  const [show, Setshow] = useState(false);
  // getting the token from redux because this is protected routes only loged in user cann acces this page if user enter the routes manually hje will not access

  useEffect(() => {
    navigate("/optverification");
    foucsref.current.focus(); // this will foucs the input filed when ever user to go this page
  }, [navigate]);
  const handleChange = (e) => {
    // this functinn handle the change in the opt fielss
    setOtp(e.target.value);
    // console.log(e.target.value); // juist for debugging
  };
  //   console.log(otp);
  const handleSubmit = async (e) => {
    Setshow(true);
    e.preventDefault();
    try {
      const data = await OptApi(otp);

      if (data.status === 200) {
        // making a dellay of 23 second to show show some effect
        setTimeout(() => {
          toast.success("opt verified successfully");
          navigate("/login");
          Setshow(false);
        }, 1000);
      }
    } catch (error) {
      //   console.error(error);
      Setshow(false);
      toast.error("please enter valid opt");
      //   console.log(error); // just for debugging
    }
    // console.log("Verifying OTP:", otp); // just for debugging
  };

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
                {/* condtilally rendering of button based on the state */}
                <button
                  disabled={otp.length < 6}
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  {show ? "Verifying.." : "  Verify OTP"}
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
