import React, { useEffect } from "react";

const ForgotPassword = () => {
  // for the state management

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
            />
            <button className="btn btn-outline-success mt-3 w-100">
              Send Code
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
