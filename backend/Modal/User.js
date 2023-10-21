const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 6,
      max: 64,
    },

    stripe_account_id: String,
    stripe_seller: {},
    stripeSession: {},
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt
);
// creating collection with this particular schema
const User = mongoose.model("User", registerSchema);
module.exports = User;
