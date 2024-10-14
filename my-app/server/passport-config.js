const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./config"); // Adjust this according to your User model

function initialize(passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
            try {
                // Check if user exists
                const user = await User.findOne({ email });
                if (!user) {
                    return done(null, false, { message: "No user with that email" });
                }

                // Check if password matches
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    return done(null, user); // Login successful
                } else {
                    return done(null, false, { message: "Password is incorrect" });
                }
            } catch (error) {
                return done(error);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
}

module.exports = initialize;
