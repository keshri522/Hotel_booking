import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../dashboardNav";
import ConnectNav from "../ConnectNav";
import { Link } from "react-router-dom";
const Seller = () => {
  const navigate = useNavigate();
  // need to check this is protected routes only login user can access this routes
  const User = useSelector((state) => state.rootReducers.userLogin);
  useEffect(() => {
    // Check if token is present, then move to /dashboard, otherwise navigate to /login
    if (User && User.token) {
      navigate("/seller");
    } else {
      navigate("/login");
    }
  }, [User, navigate]);
  // i want if there is no user and no token then no need to render or retun the componets it throw error so
  if (!(User && User.token)) {
    return null;
  }
  // based on the stipe connect showing the seller dashboard
  // if user is present or if stripe_connect is there then only show add hotels
  // otherwise show first to connect wihth stipe
  const ConnectedStripe = () => (
    <div className="container-fluid">
      {/* need to show a button click on that show the hotels */}
      <div className="row">
        <div className="col-md-10">
          <h1>Your Hotels</h1>
        </div>
        <div className="col-md-2">
          <Link
            style={{ fontWeight: "bold", color: "white" }}
            to="/hotels/new"
            className="btn btn-secondary"
          >
            + Add Hotels
          </Link>
        </div>
      </div>
    </div>
  );
  // this is for the user who is not connected with stripe
  const NotConnectedStripe = () => (
    <div className="container-fluid">
      {/* need to show a button click on that show the hotels */}
      <div className="row">
        <div className="col-md-10">
          <h1>Not connected with stipe</h1>
        </div>
        <div className="col-md-2">
          {/* <Link
            style={{ fontWeight: "bold", color: "white" }}
            to="/hotels/new"
            className="btn btn-secondary"
          >
            + Add Hotels
          </Link> */}
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className="container-fluid bg-secondary p-3 text-center ">
        <ConnectNav></ConnectNav>
      </div>
      <div className="container-fluid p-4">
        <DashboardNav></DashboardNav>
      </div>
      {/* showing based on the stripe connect rendering the dashboard */}

      {User &&
      User.User &&
      User.User.stripe_seller &&
      User.User.stripe.charges_enabled
        ? ConnectedStripe()
        : NotConnectedStripe()}
    </>
  );
};

export default Seller;
