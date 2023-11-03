import React from "react";
import DatePicker from "antd/lib/date-picker";
import moment from "moment";

const HotelForm = ({
  handleImageChange,
  handleSubmit,
  handlechange,
  values,
  Setvalues,
  show,
  Setshow,
}) => {
  const { title, content, price, location, bed, to, from } = values; // Destructuring values for easier access

  return (
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
        value={title}
        onChange={handlechange}
        placeholder="Title"
        className="form-control mt-3"
        required
      />
      <textarea
        type="text"
        name="content"
        value={content}
        onChange={handlechange}
        placeholder="Content"
        className="form-control mt-3"
        required
      />
      <input
        type="number"
        name="price"
        value={price}
        onChange={handlechange}
        placeholder="Price"
        className="form-control mt-3"
        required
      />
      <select
        name="bed"
        value={bed}
        placeholder="Select beds"
        className="form-control mt-3"
        onChange={(e) => {
          Setvalues({ ...values, bed: e.target.value });
        }}
        required
      >
        <option value="" hidden>
          Select beds
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <DatePicker
        className="form-control mt-3"
        placeholder="From-Date"
        onChange={(dateString, date) => {
          Setvalues({ ...values, from: date });
        }}
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
        required
      ></DatePicker>
      <DatePicker
        className="form-control  mt-3"
        placeholder="To-Date"
        onChange={(dateString, date) => {
          Setvalues({ ...values, to: date });
        }}
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
        required
      ></DatePicker>

      <input
        type="text"
        name="location"
        value={location}
        onChange={handlechange}
        placeholder="Enter location of hotel"
        className="form-control mt-3"
        required
      />
      {show ? (
        <button className="btn btn-outline-primary m-3">Saving...</button>
      ) : (
        <button
          type="submit"
          className="btn btn-outline-primary m-3"
          disabled={
            title.length === 0 ||
            price.length === 0 ||
            content.length === 0 ||
            values.bed.length === 0
          }
        >
          Save
        </button>
      )}
    </form>
  );
};

export default HotelForm;
