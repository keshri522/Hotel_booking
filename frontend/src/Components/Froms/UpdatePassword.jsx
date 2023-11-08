import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const Getdata = () => {
    // this method return the email from localstorage
    let find = localStorage.getItem("email");
    if (find) {
      return find;
    }
    return null;
  };
  // for the state management
  const [show, Setshow] = useState(false);
  const [email, Setemail] = useState(Getdata());
  const [data, Setdata] = useState({
    // this is for the keep the track of hanldechanges
    password: "",
    Cpassword: "",
  });
  // this function will keep the changes on input fields
  const handleChange = (e) => {
    const { value } = e.target;
    Setdata({ ...data, [e.target.name]: value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    try {
      // first need to handling the form validation here
      if (data.password.length === 0 || data.Cpassword.length === 0) {
        toast.error("Please fill all the fields");
        return;
      }

      // this is for password check validation
      if (!passwordRegex.test(data.password)) {
        toast.error(
          "Password should be at least 6 characters long and include at least one letter, one number, and one special character"
        );
        return;
      }
      // matches both passwords arre same then only go
      if (data.password !== data.Cpassword) {
        toast.error("Password and confirm Password should be same");
        return;
      }
    } catch (error) {
      toast.error(error);
    }
    // addig this email to the locatstoage to any wheer can access
  };

  return (
    <>
      <div className="container-fluid bg-secondary">
        <div className="row">
          <div className="col-md-12 text-center p-3">
            <h3 className="text-white">Update Password page Page</h3>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              value={email}
              className="form-control p-2 texts text-center"
              style={{ border: "none", borderBottom: "2px solid green" }}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Enter new password"
              onChange={handleChange}
              className="form-control p-2 texts text-center mt-3"
              style={{ border: "none", borderBottom: "2px solid green" }}
              required
            />
            <input
              name="Cpassword"
              type="password"
              onChange={handleChange}
              placeholder="Confirm password"
              className="form-control p-2 texts text-center mt-3"
              style={{ border: "none", borderBottom: "2px solid green" }}
              required
            />
            {show ? (
              <button>...Updating</button>
            ) : (
              <button
                onClick={handleClick}
                className="btn btn-outline-warning mt-3 w-100"
                disabled={!data.password || !data.Cpassword}
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
