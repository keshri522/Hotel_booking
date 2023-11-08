const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../Modal/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const Hotel = require("../Modal/NewHotels");
const sendOtpEmail = require("../Nodemailer/nodemailer");
const otpfunction = require("../Optgenerator/opt");
const FogotModel = require("../Modal/ForgotPassword");
const stripe = require("stripe")(process.env.STRIPE_KEY); // this is stipe secret key onc we can acdces the payment
const register = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  // console.log("the email is", email);
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
    // genearting the random opt this wwill be save in to db
    var opts = await otpfunction();
    // console.log(opts);
    req.user = opts; // addiong the opts to req.user that can be access any user in application
    // calling this function that will send opt to req.body.email id
    const check = await sendOtpEmail(req, res);
    // console.log(check);
    // creating a new instance
    const newUser = new User({
      name: name,
      email: email,
      password: hashPassword,
      Otp: opts, // saving the opt to databse of user collections
    });
    await newUser.save();
    res.status(200).send("User added Succefully");
    // we need to send opt to given email
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(400).send(error.message);
  }
};

const login = async (req, res) => {
  // console.log(process.env.JWTSECRET);
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
  // note first check if the id coming in th body is already present then find make it update
  const id = req.body.data._id;

  try {
    // destructing the data coming from body
    const { title, content, price, bed, images, location, from, to } =
      req.body.data;
    if (id) {
      const find = await Hotel.findByIdAndUpdate(id, {
        title: title,
        content: content,
        price: price,
        bed: bed,
        images: images,
        location: location,
        fromDate: from,
        toDate: to,
        postedBy: req.user._id, // this id will come once jwt is verifed then add the in req.user
      });
      if (find) {
        res.status(200).send("true");
      } else {
        res.status(400).send("false");
      }
    } else {
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
        postedBy: req.user._id, // this id will come once jwt is verifed then add the in req.user
      });
      //save the data in data base
      await Newhotels.save();
      res.status(200).send("true");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getHotels = async (req, res) => {
  const perpage = 3; // per page how many hotesl
  const CurrentPage = req.query.page || 1;
  const find = (CurrentPage - 1) * perpage;
  try {
    const hotels = await Hotel.find({})
      .populate("postedBy")
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

// this function will return the hoteslist bases on the login user or who created the htoesl
const loginUserHotels = async (req, res) => {
  try {
    let hotelslist = await Hotel.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "name _id"
    ); // this will give only the username and its id that can show to cleint side

    if (hotelslist.length > 0) {
      res.status(200).send(hotelslist);
      // console.log(hotelslist);
    } else {
      res.status(400).send("Hotels not found");
    }
  } catch (error) {
    res.status(500).send("Not found");
  }
};
// this api first delte the hotes then return all the booked hotels by user
const deleteBookedHotel = async (req, res) => {
  const { id } = req.body;

  try {
    let deletedHotel = await Hotel.findByIdAndDelete(id);
    let hotelslist = await Hotel.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "name _id"
    ); // this will give only the username and its id that can show to cleint side

    if (hotelslist.length > 0) {
      res.status(200).send(hotelslist);
    } else {
      res.status(400).send("Hotels not found");
    }
  } catch (error) {
    res.status(500).send("Not found");
  }
};
// this function will return a single hotels based on the id coming in req
const singleHotel = async (req, res) => {
  const id = req.body.id;

  try {
    let hotel = await Hotel.findById(id).populate("postedBy", "name _id");

    if (hotel) {
      res.status(200).send(hotel);
    } else {
      res.status(400).send("Hotel not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error"); // <-- Changed response message to a more generic error message
  }
};
// this function will create a connection between stripe and payment geteway
const StripeBookHotel = async (req, res) => {
  const { data } = req.body;
  // console.log(data.price);
  try {
    const response = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: data.title,
              images: [data.images], // this will show the image
            },
            unit_amount: data.price * 100, // to make it round figure
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://keshri522.github.io/Hotel_booking/#/success", // if payment is successful then redirect back to
      cancel_url: "https://keshri522.github.io/Hotel_booking/#/error", // if payment is unsuccessful then redirect back to
    });
    res.status(200).send({ url: response.url }); // this url is urul of stri[e]
  } catch (error) {
    // console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
// this function will verify the opts from the databse once matched then redircet to login page
const Optverification = async (req, res) => {
  const { data } = req.body;

  try {
    // if first find the opt in User collection
    let verifiedopt = await User.find({ Otp: data });
    if (!verifiedopt) {
      res.status(404).send("Invalid Opt please enter correct Opt");
    } else {
      res.status(200).send(true);
    }
  } catch (error) {
    // console.log(error);

    res.status(500).send("Internal Server Error");
  }
};
// this function  will generate opt in the Forgot password collection
const ForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // i need to firt verfiy the email comig from the data is valid or not
    const EmailVerifcation = await User.find({ email: email });
    req.body.email = EmailVerifcation[0].email; // assiging to the req.body.email first vrerify the email then
    if (!EmailVerifcation) {
      res.status(404).send("Email is Invalid");
    } else {
      // i will send or call the opt generator function which will send otp to the given mail
      var opts = await otpfunction();
      // console.log(opts);
      req.user = opts; // addiong the opts to req.user that can be access any user in application
      // calling this function that will send opt to req.body.email id
      const check = await sendOtpEmail(req, res);
      // i need to save that opt to forgot model
      const newData = new FogotModel({
        Opt: opts,
      });
      await newData.save(); // saving to the databse futher we have to verify
      res.status(200).send("Otp sent successfully");
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
// this funtion will verified the opt from ForgotPassword model
const verifedOpt = async (req, res) => {
  const { data } = req.body; // this is the opt coming from client side

  try {
    const checkOpt = await FogotModel.find({ Opt: data });
    if (checkOpt.length === 0) {
      res.status(404).send("OTP is Invalid");
    } else {
      res.status(200).send(true);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
// this contoller will update the password of thev user while in the forgot password
const UpdatePassword = async (req, res) => {
  const { data } = req.body;

  try {
    // need to validate the data coming in the body

    if (!data.email) {
      return res.status(400).send("Email is Required");
    }
    if (!data.password || data.password.length < 6) {
      return res
        .status(400)
        .send(
          "Password must be at least 6 char with one letter and special character"
        );
    }
    if (data.password !== data.Cpassword) {
      return res.status(400).send("Password and confirm Password must be same");
    }
    // let me check if user if already present in db
    const existUser = await User.findOne({ email: data.email });
    if (!existUser) {
      res.status(404).send("This User is not Registered");
    }
    // after here i am using hashing the password save the hashed password to db
    const hashPassword = await bcrypt.hash(data.password, 12);

    // update the databsee to mongodb

    existUser.password = hashPassword; // updating the password of current user
    await existUser.save();
    // saving the new password with the user
    res.status(200).send("Password updated successfully");
    /// saving the hashed password or email to the db
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  register,
  login,
  createHotels,
  getHotels,
  totalHotels,
  deleteHotel,
  loginUserHotels,
  deleteBookedHotel,
  singleHotel,
  StripeBookHotel,
  Optverification,
  ForgotPassword,
  verifedOpt,
  UpdatePassword,
};
