import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import HotelForm from "../Froms/Hotelform";
import GetsingleHotel from "./../Functions/getsinglehotels";
import CreateHotels from "../Functions/Api";
const EditHotels = () => {
  const [values, Setvalues] = useState({
    title: "",
    content: "",
    location: "",
    price: "",
    bed: "",
    images: "",
    to: "",
    from: "",
  });
  const { title, content, location, price, images, to, from, bed } = values;
  let hotelIds; // hotels ids
  const User = useSelector((state) => state.rootReducers.userLogin); // this will give the current logged in user
  const getId = () => {
    let ids = localStorage.getItem("id");
    hotelIds = ids;
  };

  useEffect(() => {
    // this functino will find the single hotels id
    getId();
  }, [User]);
  const navigate = useNavigate();

  const [show, Setshow] = useState("");
  const [preview, Setpreview] = useState("");
  useEffect(() => {
    GetsingleHotel(User.token, hotelIds)
      .then((res) => {
        // console.log(res);
        res.data.toDate = new Date(res.data.toDate);
        res.data.fromDate = new Date(res.data.fromDate);
        Setvalues({ ...values, ...res.data });

        Setpreview(res.data.images); // setting the image
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [User, hotelIds]);
  // this is protected routes only logged user can access this routes
  // routes based login
  //   console.log(values);
  useEffect(() => {
    if (title) {
      const paths = title.split(" ").join("");
      //   console.log(paths);
      if (User && User.token) {
        navigate(`/seller/edit/${paths}`);
      } else {
        navigate("/login");
      }
    }
  }, [User, navigate, title]);

  // if no User or User.email is present the no need to return the JSX simply return null
  if (!(User && User.token)) {
    return null;
  }
  // creating submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // sending all the data to the backend
    try {
      Setshow(true);
      let res = await CreateHotels(User.token, values);

      setTimeout(() => {
        if (res.status === 200) {
          toast.success("Hotel Updated Sucessfully");
          // redireect to hotels page
          navigate("/");
        }
        Setshow(false);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        if (error && error.response && error.response.status === 400) {
          toast.error(`${error.message}`);
        }
        Setshow(false);
      }, 1000);
    }
  };
  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      const previewurl = URL.createObjectURL(file); // create the url of this
      Setpreview(previewurl);
      // uploading to cloudinary
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
      formdata.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
      // making request to cloudinary
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,

        formdata //once i clikc on the signup the photo is uploaded to cloudinary server and give a link that link is added in our datab user collection
      );
      // console.log(res.data.url); // this is the url of cloudinary

      Setvalues({ ...values, images: res.data.url }); // this is cloudinary url
    } catch (error) {
      console.log(error.message);
      toast.error(`${error.message}`);
    }
  };

  // creating a function
  const handlechange = (e) => {
    const { name, value } = e.target;
    Setvalues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="container_fluid p-4 m-1 bg-secondary text-center">
        <h2>Update Hotels</h2>
      </div>
      <div className="container_fluid ">
        <div className="row m-2">
          <div className="col-md-10">
            {/* this is hotel form data */}
            <HotelForm
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              handlechange={handlechange}
              Setvalues={Setvalues}
              values={values}
              show={show}
              Setshow={Setshow}
            ></HotelForm>
          </div>
          {/* for the preview of the images shows condtionally */}
          {preview ? (
            <div className="col-md-2">
              <img src={preview} alt="Image_preview" className="img1  m-2" />
              <span
                onClick={() => {
                  Setpreview("");
                }}
                className="text-danger"
                type="button"
              >
                X
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default EditHotels;
