import React, { useEffect, useState } from "react";

import Gethotels from "../Functions/GetHotles";
import BootstapCard from "../Cards/bootstapCard";
import { toast } from "react-toastify";
import TotalProducts from "../Functions/TotalProducts";

// pagination from ant design
import { Pagination } from "antd";
import LoadingSpinner from "../Loadingeffect/loading";
import "../Loadingeffect/loading.css"; // this is the css file of the loading effect
const Home = () => {
  const [hotels, Sethotles] = useState([]);
  const [show, Setshow] = useState(true); // Set show to true initially
  const [page, Setpage] = useState(1);
  const [check, Setcheck] = useState(false);
  const [totalProuct, SettotalProduct] = useState(0);
  // const dispatch = useDispatch();
  // this function will handle the page changes based on pagination
  const handlePageChange = (page) => {
    Setpage(page);
  };

  useEffect(() => {
    Gethotels(page)
      .then((res) => {
        Sethotles(res.data);
        Setshow(false); // Set show to false after data is fetched
      })
      .catch((err) => {
        Setshow(false); // Set show to false in case of error
        toast.error(err.message);
      });
  }, [page]);
  // this is for the total products
  useEffect(() => {
    TotalProducts()
      .then((res) => {
        // console.log(res.data);
        SettotalProduct(res.data.hotelsCount);
        // this line will change the pagination based on the total coutn
        const newTotalPages = Math.ceil(res.data.hotelsCount / 3);
        if (page > newTotalPages) {
          Setpage(newTotalPages); // Set page to the last page if the current page is beyond the new total pages
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [page, check]);

  return (
    <>
      {show ? (
        <div className="container-fluid  text-center mt-1 p-2 bg-">
          <h3 className="text-danger">
            Server might be slow have patience loading...
          </h3>
        </div>
      ) : (
        <div className="container-fluid  text-center mt-1 p-2 bg-secondary">
          <h2 className="text-white">All Hotels</h2>
        </div>
      )}
      <div className="container">
        {show ? (
          <div className="load">
            {/* <h3 className="text-danger">...loading</h3> */}
            <LoadingSpinner />
          </div>
        ) : (
          hotels.map((hotel) => (
            <BootstapCard key={hotel._id} hotel={hotel}></BootstapCard>
          ))
        )}
      </div>

      <div className="container-fluid text-center">
        <Pagination
          current={page}
          total={Math.ceil(totalProuct / 3) * 10} // show pagiantion based on the page number
          onChange={handlePageChange}
          className="text-center text-danger p-2 mb-1"
        ></Pagination>
      </div>
    </>
  );
};

export default Home;
