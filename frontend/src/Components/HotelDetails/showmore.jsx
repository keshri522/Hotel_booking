import React from "react";
import { useLocation } from "react-router-dom";
const ShowmoreDetails = () => {
  const location = useLocation();
  console.log(location.state.data);
  return <div></div>;
};

export default ShowmoreDetails;
