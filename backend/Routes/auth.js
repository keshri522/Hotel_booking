// in this folder of auth i am adding all the authorization like login and signup

const express = require("express");
// simply use router to handle all the routes
const router = express.Router();
// impoting the controllers
const { register, login, stripe } = require("../controllers/auth");
router.post("/register", register);
router.post("/login", login);
// auth middleware to check or verify the jwt token
const authMiddleware = require("../middleware/auth");
// create a post routes which will handle the stripe payouts
router.post("/create_connect_account", authMiddleware, stripe);
module.exports = router;
