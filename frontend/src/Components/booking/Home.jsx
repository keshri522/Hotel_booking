import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../Redux/reducers/LoginUser";
import { useSelector } from "react-redux";
import Gethotels from "../Functions/GetHotles";
import BootstapCard from "../Cards/bootstapCard";
import Spinner from "./../Spinner/spinner";
import TotalProducts from "../Functions/TotalProducts";
// pagination from ant design
import { Pagination } from "antd";
const Home = () => {
  const [hotels, Sethotles] = useState([]);
  const [show, Setshow] = useState(true); // Set show to true initially
  const [page, Setpage] = useState(1);
  const [totalProuct, SettotalProduct] = useState(0);
  // const dispatch = useDispatch();
  // this function will handle the page changes based on pagination
  const handlePageChange = (page) => {
    Setpage(page);
  };
  // this function will the hotels
  const handleDelete = (id) => {
    // deleting the hotel which is equal to id of the
    // making api call to backend to delete the particular hotels
  };

  useEffect(() => {
    Gethotels(page)
      .then((res) => {
        Sethotles(res.data);
        Setshow(false); // Set show to false after data is fetched
      })
      .catch((err) => {
        console.log(err);
        Setshow(false); // Set show to false in case of error
      });
  }, [page]);
  // this is for the total products
  useEffect(() => {
    TotalProducts()
      .then((res) => {
        // console.log(res.data);
        SettotalProduct(res.data.hotelsCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  return (
    <>
      <div className="container-fluid  text-center mt-1 p-2 bg-secondary">
        <h2 className="text-white">All Hotels</h2>
      </div>
      <div className="container">
        {show ? (
          <div className="load">
            <h3 className="text-danger">...loading</h3>
          </div>
        ) : (
          hotels.map((hotel) => (
            <BootstapCard
              handleDelete={handleDelete}
              key={hotel._id}
              hotel={hotel}
            ></BootstapCard>
          ))
        )}
      </div>

      <div className="container-fluid text-center">
        <Pagination
          current={page}
          total={Math.ceil(totalProuct / 3) * 10}
          onChange={handlePageChange}
          className="text-center text-danger p-2 mb-1"
        ></Pagination>
      </div>
    </>
  );
};

export default Home;
