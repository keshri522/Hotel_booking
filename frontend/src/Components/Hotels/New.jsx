import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import { useDispatch } from "react-redux";
import { loggedInUser } from "../Redux/reducers/LoginUser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const NewHotels = () => {
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
  });
  // if no User or User.email is present the no need to return the JSX simply return null
  if (!(User && User.token)) {
    return null;
  }
  // creating submit function
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file

    if (file) {
      const previewURL = URL.createObjectURL(file);
      Setpreview(previewURL);
      Setvalues({ ...values, images: file });
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

  const HotelForm = () => (
    <form onSubmit={handleSubmit}>
      <label htmlFor="image" className="btn btn-outline-primary  btn-block">
        <input
          type="file"
          hidden
          name="images"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        image
      </label>
      <input
        type="text"
        name="title"
        id=""
        value={title}
        onChange={handlechange}
        placeholder="Title"
        className="form-control mt-2"
        required
      />
      <textarea
        type="text"
        name="content"
        id=""
        value={content}
        onChange={handlechange}
        placeholder="Content"
        className="form-control mt-2"
        required
      />
      <input
        type="number"
        name="price"
        id=""
        value={price}
        onChange={handlechange}
        placeholder="Price"
        className="form-control mt-2"
        required
      />
      <input
        type="number"
        name="bed"
        id=""
        value={bed}
        onChange={handlechange}
        placeholder="Number of beds"
        className="form-control mt-2"
        required
      />
      <button
        className="btn btn-outline-primary m-2"
        disabled={
          title.length === 0 ||
          price.length === 0 ||
          content.length === 0 ||
          bed.length === 0
        }
      >
        Save
      </button>
    </form>
  );

  return (
    <>
      <div className="container_fluid p-4 m-1 bg-secondary text-center">
        <h2>Add hotel</h2>
      </div>
      <div className="container_fluid ">
        <div className="row m-2">
          <div className="col-md-10">{HotelForm()}</div>
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
