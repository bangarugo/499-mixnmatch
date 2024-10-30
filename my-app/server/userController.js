// userController.js
const collection = require('./config'); // Import the MongoDB model

// Function to get user by email
async function getUserByEmail(email) {
    return await collection.findOne({ email });
}

// Function to get user by ID (you might need this later)
async function getUserById(id) {
    return await collection.findById(id);
}

// Export the functions
module.exports = { getUserByEmail, getUserById };
