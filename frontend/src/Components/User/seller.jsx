import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../dashboardNav";
import ConnectNav from "../ConnectNav";
import { Link } from "react-router-dom";
import { faHouse, faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConnectStripe from "../Functions/Api";
import { toast } from "react-toastify";
// this will show spinner based on the response
import Spinner from "../Spinner/spinner";
const Seller = () => {
  const [show, Setshow] = useState(false);
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
  // this is the onclick event
  const ProcessPayouts = async () => {
    try {
      Setshow(true);
      let res = await ConnectStripe(User.token);
      setTimeout(() => {
        console.log(res);
        Setshow(false);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        toast.error("Stripe payout failed plese try after sometime");
        Setshow(false);
      }, 1000);
    }
  };
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
        <div className="col-md-6 offset-md-3  text-center">
          <div className="p-5 pointer">
            <FontAwesomeIcon
              className="h1"
              fade
              icon={faHouse}
            ></FontAwesomeIcon>
            <h4>Setup payouts to post a hotel</h4>
            <p className="lead text-primary">
              Thrid Party Parterns to transfer earning to bank accounts
            </p>
            {/* showing the button contionally based on the state of the components  */}
            {show ? (
              <Spinner></Spinner>
            ) : (
              <button className="btn btn-primary" onClick={ProcessPayouts}>
                Process Payout
              </button>
            )}
            <br />
            <br />
            <p className="text-muted">
              <small>
                You'll be redirected to Stripe to complete the onboarding
                process
              </small>
            </p>
          </div>
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
