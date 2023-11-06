import React, { useState } from "react";
import LoginForm from "../Froms/LoginForm";
import { toast } from "react-toastify";
import axios from "axios";
import CryptoJS from "crypto-js";
import { loggedInUser } from "../Redux/reducers/LoginUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // route based login

  const dispatch = useDispatch();
  // for the state of the componets
  const [formData, SetformData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // this is the state to show the spinner when signup
  const [spinner, Setspinner] = useState(false);

  // function for button
  const handleClikc = async (e) => {
    // this is for the form validation regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    e.preventDefault();
    try {
      if (formData.email.length === 0 || formData.password.length === 0) {
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
      const hashpassword = CryptoJS.SHA256(formData.password).toString(); // hasing the real passowrd
      // the perform api request after validation
      Setspinner(true);
      let res = await axios.post(
        `${process.env.REACT_APP_REACT_API_URL}/login`,
        {
          name: formData.name,
          email: formData.email,
          password: hashpassword,
        }
      );
      // console.log(res);

      if (res.status === 200) {
        setTimeout(() => {
          Setspinner(false);
          // sending the res to local strogage to persist the data while refreshing
          localStorage.setItem("LoginUser", JSON.stringify(res.data));

          dispatch(loggedInUser(res.data));
          // add this res.data to reducx as well as local stroage then redirects
          toast.success("Login Sucessfully");
          // looking for route based redirect
          if (location && location.state && location.state.from) {
            // if the current path is present the navigate the user to previous paths
            navigate(`${location.state.from}`);
          } else {
            navigate("/");
          }
        }, 1000);
      }
      // setting the response  then redircts to login page once i got the response
    } catch (error) {
      if (error && error.response && error.response.status === 400) {
        setTimeout(() => {
          // toast.error(`${error.response.data}`);
          toast.error("Invalid Credentials");
          Setspinner(false);
        }, 1000);
      }

      // console.log(error);
    }
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

  return (
    <>
      <div
        style={{ backgroundColor: "#833471" }}
        className="container-fluid mt-3   p-3 text-center"
      >
        <h1 className="text-white" style={{ textShadow: "2px  2px black" }}>
          Welcome to Keshri Hotel
        </h1>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              style={{ height: "22rem", width: "23rem" }}
              src="https://img.freepik.com/free-vector/boy-girl-from-srilanka_1308-20405.jpg?w=740&t=st=1697798919~exp=1697799519~hmac=7eec836e478b46abe7cb43129a5feb21e02c92ff07babdb3289f86bc707baa64"
              alt="Hi images"
            />
          </div>
          <div className="col-md-6">
            <LoginForm
              handleChange={handleChange}
              handleClikc={handleClikc}
              formData={formData}
              SetformData={SetformData}
              spinner={spinner}
            ></LoginForm>
          </div>
        </div>
      </div>
    </>
  );
};
//  <div className="col-md-6 offset-md-3  ">{RegisterForm()}</div>
export default Login;
