// in this folder of auth i am adding all the authorization like login and signup
const express = require("express");
// simply use router to handle all the routes
const router = express.Router();
// impoting the controllers
const { register, login, Stripe } = require("../controllers/auth");
router.post("/register", register);
router.post("/login", login);
// create a post routes which will handle the stripe payouts
router.post("/create_connect_account", authMiddleware, Stripe);
module.exports = router;
