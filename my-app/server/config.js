require("dotenv").config(); // Load environment variables from .env

const mongoose = require("mongoose");

// Log MONGO_URI to check if it is loaded correctly (remove this later)
console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB
const connect = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Define the schema
const Loginschema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  images: [
    {
      url: String,
      key: String,
      caption: String,
      category: { type: String, required: true },
      uploadedAt: { type: Date, default: Date.now },
    },
  ],
  savedOutfits: [
    {
      outfitImages: [String], // Array of outfit image URLs
      createdAt: { type: Date, default: Date.now },
      isFavorite: { type: Boolean, default: false }, // New field for favorite status
    },
  ],
});

// Create and export the model
const collection = mongoose.model("users", Loginschema);

module.exports = collection;
