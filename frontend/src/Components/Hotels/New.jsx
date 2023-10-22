import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../Redux/reducers/LoginUser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const NewHotels = () => {
  const User = useSelector((state) => state.rootReducers.userLogin); // this will give the current logged in user
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // this is protected routes only logged user can access this routes
  // routes based login
  useEffect(() => {
    if (User && User.token) {
      navigate("/hotels/new");
    } else {
      navigate("/login");
    }
  });
  // if no User or User.email is present the no need to return the JSX simply return null
  if (!(User && User.token)) {
    return null;
  }
  return (
    <div>
      <h1>New Hotels</h1>
    </div>
  );
};

export default NewHotels;
