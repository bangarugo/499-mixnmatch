// Other required imports
const express = require("express");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const initializePassport = require("./passport-config");
const path = require("path");
const MongoStore = require('connect-mongo');
const multer = require('multer');
const fs = require("fs");

// Import the config file, which connects to MongoDB
const User = require('./config');  // Changed from 'collection' to 'User' for clarity

const app = express();

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
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../client/public/uploads/'); // Ensure this path is correct
    },
    filename: (req, file, cb) => {
      if (!req.user || !req.user.email) {
        cb(new Error("User is not authenticated or email is missing"));
      } else {
        cb(null, `${req.user.email}_profile_pic${path.extname(file.originalname)}`); // Set the filename
      }
    }
});
const upload = multer({ storage });

// Middleware to ensure user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: 'User not authenticated' });
};

// Routes and other logic
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: `Welcome ${req.user.firstName}` });
  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  res.json({ message: "Login Page", error: req.flash("error_msg") });
});

app.get("/register", (req, res) => {
  res.json({ message: "Register Page", error: req.flash("error_msg") });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
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

app.post("/login", async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({ error: info.message });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: `Welcome ${user.firstName}`, user });
    });
  })(req, res, next);
});

app.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.redirect('/');
    }
    res.redirect('/login');
  });
});

app.get('/profile', isAuthenticated, (req, res) => {
  res.json({ message: "Profile Page", user: req.user });
});

// Upload profile picture
app.post('/users/:userId/upload-profile-picture', isAuthenticated, upload.single('profilePicture'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const profilePicPath = req.file.path;
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.profilePic = profilePicPath;
        await user.save();

        res.json({ profilePic: profilePicPath });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
