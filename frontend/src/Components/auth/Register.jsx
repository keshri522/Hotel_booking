import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  // for the state of the componets
  const [fromData, SetformData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  // function for button
  const handleClikc = (e) => {
    e.preventDefault();
    // now Setting the fields to empty
    //' making api call here
  };
  const handleReset = () => {
    SetformData({
      name: "",
      email: "",
      password: "",
      cpassword: "",
    });
  };
  // this function will track the inputs that user enters
  const handleChange = (e) => {
    const { value, name } = e.target;
    SetformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // function which will navigate to login routes
  const hanldeRoute = () => {
    navigate("/login");
  };
  // creating a function which will show the Register form
  const RegisterForm = () => {
    return (
      <div>
        <div className="form-floating mb-3 ">
          <input
            type="text"
            name="name"
            value={fromData.name}
            className="form-control"
            placeholder="Enter your name"
            onChange={handleChange}
          />
          <label htmlFor="floatingPassword">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            value={fromData.email}
            className="form-control"
            id="floatingInput"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            value={fromData.password}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={handleChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            name="cpassword"
            value={fromData.cpassword}
            className="form-control"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          <label htmlFor="floatingPassword">Confirm Password</label>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary mt-2" onClick={handleClikc}>
            Submit
          </button>
          <button className="btn btn-danger mt-2" onClick={handleReset}>
            Reset
          </button>
          <label
            type="button"
            className=" mt-2 text-primary font-weight-bold"
            onClick={hanldeRoute}
          >
            Dont't have account
          </label>
        </div>
      </div>
    );
  };
  return (
    <>
      <div
        style={{ backgroundColor: "#833471" }}
        className="container-fluid mt-3   p-3 text-center"
      >
        <h1 className="text-white" style={{ textShadow: "2px  2px black" }}>
          {" "}
          User Registration
        </h1>
      </div>
      <div className="container mt-4 ">
        <div className="row">
          <div className="col-md-6">
            <img
              style={{ height: "22rem", width: "23rem" }}
              src="https://img.freepik.com/free-vector/girl-using-laptop-cartoon_1308-119869.jpg?w=360&t=st=1697798405~exp=1697799005~hmac=36d86af6769ef80eb6a68bed692d8e1a93067dea0d629916dc8e5534fe5d44e3"
              alt=""
            />
          </div>
          <div className="col-md-6">{RegisterForm()}</div>
        </div>
      </div>
    </>
  );
};
//  <div className="col-md-6 offset-md-3  ">{RegisterForm()}</div>
export default Register;
