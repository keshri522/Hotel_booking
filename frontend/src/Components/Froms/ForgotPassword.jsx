import React, { useEffect, useState } from "react";
import ForgotPasswordApi from "../Functions/ForgotPassword";
import { toast } from "react-toastify";
const ForgotPassword = () => {
  // for the state management
  const [show, Setshow] = useState(false);
  const [email, Setemail] = useState();
  const handleChange = (e) => {
    const { value } = e.target;
    Setemail(value);
  };
  console.log(email);
  // this function will send the vlaues of onchange to the backend and verified the opt
  const handleClick = async (e) => {
    Setshow(true);
    e.preventDefault();
    try {
      let res = await ForgotPasswordApi(email);
      if (res.status === 200) {
        setTimeout(() => {
          Setshow(false);
          toast.success("Check your email to reset your password");
        }, 1000);
      }
    } catch (error) {
      Setshow(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="container-fluid bg-secondary">
        <div className="row">
          <div className="col-md-12 text-center p-3">
            <h3 className="text-white">Forgot Password Page</h3>
          </div>
        </div>
      </div>
      <div className="container margin">
        <div className="row d-flex justify-content-center ">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Enter your email to send an opt"
              className="form-control p-2 texts text-center"
              style={{ border: "none", borderBottom: "2px solid green" }}
              onChange={handleChange}
            />
            {show ? (
              <button
                onClick={handleClick}
                className="btn btn-outline-success mt-3 w-100"
              >
                ...Sending Opt
              </button>
            ) : (
              <button
                onClick={handleClick}
                className="btn btn-outline-success mt-3 w-100"
              >
                Send Code
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
