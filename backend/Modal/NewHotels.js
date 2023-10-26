const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    bed: {
      type: Number,
      trim: true,
      required: true,
    },
    fromDate: {
      type: String,
      trim: true,
      required: true,
    },
    toDate: {
      type: String,
      trim: true,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Hotel = mongoose.model("Hotle", HotelSchema);
module.exports = Hotel;
