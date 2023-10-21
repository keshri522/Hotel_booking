import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import RegisterForm from "../Froms/Registerfrom"; // Register form components

const Register = () => {
  const navigate = useNavigate();
  // for the state of the componets
  const [formData, SetformData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  // this is the state to show the spinner when signup
  const [spinner, Setspinner] = useState(false);
  const [reset, Setreset] = useState(false);
  // function for button on click making async this is asynchronus call
  const handleClikc = async (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    e.preventDefault();
    try {
      if (
        formData.name.length === 0 ||
        formData.email.length === 0 ||
        formData.password.length === 0 ||
        formData.cpassword.length === 0
      ) {
        toast.error("Please fill all the fields");
        return;
      }
      // this is for the email format validation
      if (!emailRegex.test(formData.email)) {
        toast.error("Invalid email format");
        return;
      }
      // this is for password check validation
      if (!passwordRegex.test(formData.password)) {
        toast.error(
          "Password should be at least 6 characters long and include at least one letter, one number, and one special character"
        );
        return;
      }
      // matches both passwords arre same then only go
      if (formData.password !== formData.cpassword) {
        toast.error("Password and confirm Password should be same");
        return;
      }
      // the perform api request after validation
      // this will hash the password so no can see in payload
      const hashedPassword = CryptoJS.SHA256(formData.password).toString();
      const chashedPassword = CryptoJS.SHA256(formData.cpassword).toString();
      Setspinner(true);

      let data = await axios.post(
        `${process.env.REACT_APP_REACT_API_URL}/register`,
        {
          name: formData.name,
          email: formData.email,
          password: hashedPassword,
          cpassword: chashedPassword,
        }
      );
      console.log(data);

      if (data.status === 200) {
        setTimeout(() => {
          Setspinner(false);
          toast.success("Register Sucessfully");
          navigate("/login");
        }, 2000);
      }
      // setting the response  then redircts to login page once i got the response
    } catch (error) {
      if (error && error.response && error.response.status === 400) {
        setTimeout(() => {
          toast.error("User already register");
          Setspinner(false);
        }, 1000);
      }

      console.log(error);
    }
  };
  const handleReset = () => {
    Setreset(true);
    // using settime out to show effects
    setTimeout(() => {
      SetformData({
        name: "",
        email: "",
        password: "",
        cpassword: "",
      });
      toast.success("Reset Sucessfull");
      Setreset(false);
    }, 1000);
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
        className="container-fluid mt-3 p-3 text-center "
      >
        <div className="col-md-12">
          <h1 className="text-white" style={{ textShadow: "2px 2px black" }}>
            User Registration
          </h1>
        </div>
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
              formData={formData}
              SetformData={SetformData}
              hanldeRoute={hanldeRoute}
              spinner={spinner}
              reset={reset}
            ></RegisterForm>
          </div>
        </div>
      </div>
    </>
  );
};
//  <div className="col-md-6 offset-md-3  ">{RegisterForm()}</div>
export default Register;
