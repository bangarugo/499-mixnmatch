require('dotenv').config();  // Load environment variables from .env
const mongoose = require("mongoose");

// Connect to MongoDB
const connect = mongoose.connect(process.env.MONGO_URI);

connect
  .then(() => {
      console.log("Database Connected Successfully");
  })
  .catch((err) => {
      console.error("Database connection error:", err);
  });

// Define the schema with profilePic field
const Loginschema = new mongoose.Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String }  // Field to store the profile picture path
});

// Create and export the model
const collection = mongoose.model("users", Loginschema);

module.exports = collection;
