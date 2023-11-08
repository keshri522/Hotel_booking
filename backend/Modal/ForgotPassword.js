const mongoose = require("mongoose");
// here i am saving the opt for password forgot
const ForgotPasswordSchema = new mongoose.Schema(
  {
    Opt: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const ForgotPasswordModel = mongoose.model(
  "ForgotPassword",
  ForgotPasswordSchema
);
module.exports = ForgotPasswordModel;
