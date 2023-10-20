// creating Server
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

// middleware
app.use(bodyParser.urlencoded({ extended: true })); // enable json reader to the server coming from body
app.use(cors()); // that will allow to send the data from diffrent origins
app.use(morgan("tiny")); // this will all the info of the api

// creating the Server
app.get("/", (req, res) => {
  res.send("hello world");
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at the Port ${port}`);
});
