// creating Server
// third party modules
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const router = require("./Routes/auth");
// Database connection
const Database = require("./Database/databaseConnection");

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // enable json reader to the server coming from body
app.use(cors()); // that will allow to send the data from diffrent origins
app.use(morgan("tiny")); // this will all the info of the api
// separate routes that will run only on the given endpoints
app.use("/api", router);

Database();
// creating the Server

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at the Port ${port}`);
});
