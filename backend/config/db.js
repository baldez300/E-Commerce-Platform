const mongoose = require("mongoose");
const { MONGO_URI } = require("./config"); // Import config.js

require("dotenv").config(); // Load environment variables from .env

const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI); // Use MONGO_URI from config.js
  console.log(`Connected to database`);
};

module.exports = connectDB;