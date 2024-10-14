require('dotenv').config();
const mongoose = require("mongoose");

// Use process.env to get the URI from the .env file
const connect = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

connect
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch((err) => {
        console.error("Database cannot be Connected:", err);
    });

// Create Schema
const Loginschema = new mongoose.Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    password: { type: String, required: true }
});

// Collection part
const collection = mongoose.model("users", Loginschema);

module.exports = collection;
