// db.js
require("dotenv").config() 
const mongoose = require("mongoose");
const { db } = require("../models/Produce");
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
