import React from "react";
import { NavLink } from "react-router-dom";

const DashboardNav = () => {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/dashboard"
            activeClassName="active"
          >
            Your Booking
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/seller" activeClassName="active">
            Your Hotels
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default DashboardNav;
