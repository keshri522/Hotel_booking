import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateHotels from "../Functions/Api";
import { toast } from "react-toastify";
import axios from "axios";
// importing the Hotels form
import HotelForm from "../Froms/Hotelform";
const NewHotels = () => {
  const [show, Setshow] = useState(false);
  // creating state to show
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
  const [preview, Setpreview] = useState("");
  // destructing all the values
  const { title, content, location, price, images, to, from, bed } = values;
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
  }, [User, navigate]);
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
          toast.success("Hotel posted Sucessfully");
          // redireect to hotels page
          navigate("/seller");
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

  // const HotelForm = () => (
  //   <form onSubmit={handleSubmit}>
  //     <label htmlFor="image" className="btn btn-outline-primary  btn-block">
  //       <input
  //         type="file"
  //         hidden
  //         name="images"
  //         id="image"
  //         accept="image/*"
  //         onChange={handleImageChange}
  //       />
  //       image
  //     </label>
  //     <input
  //       type="text"
  //       name="title"
  //       id=""
  //       value={title}
  //       onChange={handlechange}
  //       placeholder="Title"
  //       className="form-control mt-3"
  //       required
  //     />
  //     <textarea
  //       type="text"
  //       name="content"
  //       id=""
  //       value={content}
  //       onChange={handlechange}
  //       placeholder="Content"
  //       className="form-control mt-3"
  //       required
  //     />
  //     <input
  //       type="number"
  //       name="price"
  //       id=""
  //       value={price}
  //       onChange={handlechange}
  //       placeholder="Price"
  //       className="form-control mt-3"
  //       required
  //     />
  //     <select
  //       name="bed"
  //       id=""
  //       placeholder="Select beds"
  //       className="form-control mt-3"
  //       onChange={(e) => {
  //         Setvalues({ ...values, bed: e.target.value });
  //       }}
  //     >
  //       <option value="" hidden>
  //         Select beds
  //       </option>
  //       <option value="1">{1}</option>
  //       <option value="2">{2}</option>
  //       <option value="3">{3}</option>
  //       <option value="4">{4}</option>
  //       <option value="5">{5}</option>
  //     </select>

  //     <DatePicker
  //       className="form-control mt-3"
  //       placeholder="From-Date"
  //       onChange={(dateString, date) => {
  //         Setvalues({ ...values, from: date });
  //       }}
  //       // this will not allow user to select the date which is less than today date
  //       disabledDate={(current) =>
  //         current && current.valueOf() < moment().subtract(1, "days")
  //       }
  //     ></DatePicker>
  //     <DatePicker
  //       className="form-control  mt-3"
  //       placeholder="To-Date"
  //       onChange={(dateString, date) => {
  //         Setvalues({ ...values, to: date });
  //       }}
  //       // this will not allow user to select the date which is less than today date
  //       disabledDate={(current) =>
  //         current && current.valueOf() < moment().subtract(1, "days")
  //       }
  //     ></DatePicker>

  //     <input
  //       type="text"
  //       name="location"
  //       id=""
  //       value={location}
  //       onChange={handlechange}
  //       placeholder="Enter location of hotel"
  //       className="form-control mt-3"
  //       required
  //     />
  //     {show ? (
  //       <button className="btn btn-outline-primary m-3">Saving...</button>
  //     ) : (
  //       <button
  //         className="btn btn-outline-primary m-3"
  //         disabled={
  //           title.length === 0 ||
  //           price.length === 0 ||
  //           content.length === 0 ||
  //           bed.length === 0
  //         }
  //       >
  //         Save
  //       </button>
  //     )}
  //   </form>
  // );

  return (
    <>
      <div className="container_fluid p-4 m-1 bg-secondary text-center">
        <h2>Add Hotel</h2>
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
              <img src={preview} alt="Image_preview" className="img  m-2" />
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

export default NewHotels;
