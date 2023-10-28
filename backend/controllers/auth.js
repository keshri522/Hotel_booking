const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../Modal/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const Hotel = require("../Modal/NewHotels");

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

const login = async (req, res) => {
  console.log(process.env.JWTSECRET);
  // console.log(req.body);

  // then sent a jwt token to user
  try {
    // need to verufy the email address and password
    const { email, password } = req.body;
    // first need to check the email;
    const UserEmail = await User.findOne({ email: email });

    if (!UserEmail) {
      return res.status(400).send("User not find");
    }
    // if find then go for password check using bcrypt
    const ConfirmPassword = await bcrypt.compare(password, UserEmail.password);

    if (!ConfirmPassword) {
      return res.status(400).send("Password not found");
    }

    // then need to provide the jwt token
    let token = jwt.sign({ _id: UserEmail._id }, process.env.JWTSECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      User: {
        _id: UserEmail._id,
        name: UserEmail.name,
        email: UserEmail.email,
        createdAt: UserEmail.createdAt,
        updatedAt: UserEmail.updatedAt,
      },
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
// now this is the controllers that will add functionality to form data or hotels coming from frontend
const createHotels = async (req, res) => {
  try {
    // destructing the data coming from body
    const { title, content, price, bed, images, location, from, to } =
      req.body.data;
    // now saving to databbase
    const Newhotels = new Hotel({
      title: title,
      content: content,
      price: price,
      bed: bed,
      images: images,
      location: location,
      fromDate: from,
      toDate: to,
    });
    //save the data in data base
    await Newhotels.save();
    res.status(200).send("true");
  } catch (error) {
    res.status(400).send(error);
  }
};
// this function will give all the holtels int the dataBase
const getHotels = async (req, res) => {
  const perpage = 3; // per page how many hotesl
  const CurrentPage = req.query.page || 1;
  const find = (CurrentPage - 1) * perpage;
  try {
    const hotels = await Hotel.find({})
      .populate("postedBy", "_id", "name")
      .skip(find)
      .sort({ createdAt: -1 })
      .limit(perpage); // this will give all the hotels and populate the curent user based on USER collection
    if (hotels) {
      res.status(200).send(hotels);
      // console.log(hotels);
    } else {
      res.status(400).send("Hotels not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
// this function will give toal number of hotesl present in database for paginations
const totalHotels = async (req, res) => {
  try {
    const hotelsCount = await Hotel.find({}).count();
    if (hotelsCount !== null) {
      res.status(200).send({ hotelsCount });
    } else {
      res.status(400).send("Hotels not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
// this function will delete the hotel based on the id
const deleteHotel = async (req, res) => {
  const { id, page } = req.body;

  try {
    let deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel) {
      return res.status(400).send("Hotel not found for deletion");
    }
    const perpage = 3;
    const find = (page - 1) * perpage;

    const hotels = await Hotel.find({})
      .populate("postedBy", "_id", "name")
      .skip(find)
      .sort({ createdAt: -1 })
      .limit(perpage);
    if (hotels) {
      return res.status(200).send(hotels);
    } else {
      return res.status(400).send("Hotels not found");
    }
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  register,
  login,
  createHotels,
  getHotels,
  totalHotels,
  deleteHotel,
};
