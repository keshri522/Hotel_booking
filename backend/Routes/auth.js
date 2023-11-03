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
router.post("/singlehotel", authMiddleware, singleHotel);
module.exports = router;
