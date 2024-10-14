const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const initializePassport = require("./passport-config");
const path = require("path");

// Import the config file, which connects to MongoDB
const collection = require('./config');

const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware setup
app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'], credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Passport setup
initializePassport(passport);
app.use(
  session({
      secret: "your_secret_key", // Replace with your own secret
      resave: false,
      saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes and other logic
app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ message: `Welcome ${req.user.firstName}` });
    } else {
        res.redirect("/login");
    }
});
// Route to render login
app.get("/login", (req, res) => {
    res.json({ message: "Login Page", error: req.flash("error_msg") });
});

// Route to render register
app.get("/register", (req, res) => {
    res.json({ message: "Register Page", error: req.flash("error_msg") });
});

// Handle user registration
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new collection({
            firstName: name,
            email: email,
            password: hashedPassword,
        });

        await newUser.save();
        res.json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error Registering User", error);
        res.status(500).json({ error: "Error Registering User" });
    }
});

// Define your login route (POST request)
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email in the database
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found" }); // Return error as JSON
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" }); // Return error as JSON
        }

        // If login is successful, return a success message
        res.status(200).json({ message: `Welcome ${user.firstName}`, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" }); // Return error as JSON
    }
});

// Handle user logout
app.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.redirect('/');
        }
        res.redirect('/login');
    });
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
