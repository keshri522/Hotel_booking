const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../Modal/User");
const register = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  try {
    // need to validate the data coming in the body
    if (!name) {
      return res.status(400).send("Name is Required");
    }
    if (!email) {
      return res.status(400).send("Email is Required");
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send(
          "Password must be at least 6 char with one letter and special character"
        );
    }
    if (password !== cpassword) {
      return res.status(400).send("Password and confirm Password must be same");
    }
    // let me check if user if already present in db
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).send("Email is already in use");
    }
    // after here i am using hashing the password save the hashed password to db
    const hashPassword = await bcrypt.hash(password, 12);

    // creating a new instance
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).send("User added Succefully");
  } catch (error) {
    // console.log(error);
    res.status(400).send(error.message);
  }
};

const login = (req, res) => {
  // console.log(req.body);
  res.status(200).send("login done");
};

module.exports = {
  register,
  login,
};
