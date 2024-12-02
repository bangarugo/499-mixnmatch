const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const collection = require("./config"); // Your Mongoose model

function initialize(passport) {
    // Function to authenticate users
    const authenticateUsers = async (email, password, done) => {
        try {
            // Get user by email
            const user = await collection.findOne({ email });
            if (!user) {
                return done(null, false, { message: "No user found with that email" });
            }

            // Compare the provided password with the stored hashed password
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password incorrect" });
            }
        } catch (e) {
            console.log(e);
            return done(e);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUsers));

    // Serialize user by storing user ID in session
    passport.serializeUser((user, done) => done(null, user._id)); // Use _id from MongoDB

    // Deserialize user by finding the user using the stored ID
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await collection.findById(id); // Get user by ID from DB
            done(null, user); // Attach user to req.user
        } catch (error) {
            done(error, null);
        }
    });
}

module.exports = initialize;
