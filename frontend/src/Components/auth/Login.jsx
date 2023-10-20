import React, { useState } from "react";

const Login = () => {
  // for the state of the componets
  const [fromData, SetformData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // function for button
  const handleClikc = (e) => {
    e.preventDefault();
    // now Setting the fields to empty
    //' making api call here
  };

  // this function will track the inputs that user enters
  const handleChange = (e) => {
    const { value, name } = e.target;
    SetformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // creating a function which will show the Register form
  const LoginForm = () => {
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

        <button className="btn btn-primary mt-2" onClick={handleClikc}>
          Submit
        </button>
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
          Welcome to Login
        </h1>
      </div>
      <div className="container mt-4 ">
        <div className="row">
          <div className="col-md-6">
            <img
              style={{ height: "22rem", width: "23rem" }}
              src="https://img.freepik.com/free-vector/boy-girl-from-srilanka_1308-20405.jpg?w=740&t=st=1697798919~exp=1697799519~hmac=7eec836e478b46abe7cb43129a5feb21e02c92ff07babdb3289f86bc707baa64"
              alt="Hi images"
            />
          </div>
          <div className="col-md-6">{LoginForm()}</div>
        </div>
      </div>
    </>
  );
};
//  <div className="col-md-6 offset-md-3  ">{RegisterForm()}</div>
export default Login;
