const mongoose = require("mongoose");
const User = require("../Modal/User");
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
      type: Date,
      trim: true,
      required: true,
    },
    toDate: {
      type: Date,
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
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);
const Hotel = mongoose.model("Hotle", HotelSchema);
module.exports = Hotel;
