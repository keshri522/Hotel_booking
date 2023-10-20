import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../Froms/Registerfrom"; // Register form components
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
          <div className="col-md-6">
            {/* passing props to components */}
            <RegisterForm
              handleChange={handleChange}
              handleClikc={handleClikc}
              handleReset={handleReset}
              fromData={fromData}
              SetformData={SetformData}
              hanldeRoute={hanldeRoute}
            ></RegisterForm>
          </div>
        </div>
      </div>
    </>
  );
};
//  <div className="col-md-6 offset-md-3  ">{RegisterForm()}</div>
export default Register;
