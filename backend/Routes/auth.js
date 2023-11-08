// in this folder of auth i am adding all the authorization like login and signup

const express = require("express");
// simply use router to handle all the routes
const router = express.Router();
// impoting the controllers
const {
  register,
  login,
  createHotels,
  getHotels,
  totalHotels,
  deleteHotel,
  loginUserHotels,
  deleteBookedHotel,
  singleHotel,
  Optverification,
  ForgotPassword,
  StripeBookHotel,
  verifedOpt,
  UpdatePassword,
} = require("../controllers/auth");
router.post("/register", register);
router.post("/login", login);
// auth middleware to check or verify the jwt token
const authMiddleware = require("../middleware/auth");
// create a post routes which will handle the stripe payouts
// router.post("/create_connect_account", authMiddleware);
router.post("/create_hotels", authMiddleware, createHotels);

router.get("/getHotels", getHotels);
router.get("/totalhotels", totalHotels);
router.post("/deletehotel", authMiddleware, deleteHotel);
// this routes will handle the login user who has create the hotels return all the hotels based on the id
router.get("/loginUserhotels", authMiddleware, loginUserHotels);
router.post("/deleteBookedHotel", authMiddleware, deleteBookedHotel); // this will delete booked hotes by user
router.post("/singlehotel", singleHotel);
router.post("/optverification", Optverification); // this route will handle the opt verification by user from db
router.post("/forgotPassword", ForgotPassword); // this function will sned the opt to the user who want to forgot the password
// this is stripe payment route
router.post("/forgotoptVerification", verifedOpt); // this function will first verifiy the opt of forgot password
router.post("/bookhotel", authMiddleware, StripeBookHotel); // this will
router.post("/updatePasswrod", UpdatePassword);
module.exports = router;
