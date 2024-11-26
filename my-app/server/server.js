const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const session = require("express-session");
const { isValidObjectId } = require("mongoose"); // Ensure this is imported
const passport = require("passport");
const flash = require("connect-flash");
const initializePassport = require("./passport-config");
const path = require("path");
const upload = require("./config/s3Config");
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Add your API key in .env
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc"); // Clarifai client import
const { ImageAnnotatorClient } = require("@google-cloud/vision");
const visionClient = new ImageAnnotatorClient(); // Configure Google Vision API
// Import the config file, which connects to MongoDB
const collection = require("./config");

const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Clarifai setup

const PAT = process.env.CLARIFAI_PAT; // Your Clarifai Personal Access Token
const USER_ID = process.env.CLARIFAI_USER_ID || "clarifai"; // Your user ID
const APP_ID = process.env.CLARIFAI_APP_ID || "main"; // Your app ID
const MODEL_ID = "apparel-recognition"; // Your model ID for apparel recognition
const MODEL_VERSION_ID = "dc2cd6d9bff5425a80bfe0c4105583c1"; // Version ID, optional but recommended

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${PAT}`);

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
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
app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.redirect("/");
    }
    res.redirect("/login");
  });
});

// Route to handle image upload and caption generation using Clarifai

app.post("/upload-image", upload.single("image"), async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await collection.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const IMAGE_URL = "https://samples.clarifai.com/metro-north.jpg"; // Sample image from Clarifai

    // Clarifai API call to detect apparel in the uploaded image
    stub.PostModelOutputs(
      {
        user_app_id: { user_id: USER_ID, app_id: APP_ID },
        model_id: MODEL_ID,
        version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
        inputs: [
          {
            data: {
              image: { url: IMAGE_URL }, // URL from S3 upload
            },
          },
        ],
      },
      metadata,
      async (err, response) => {
        if (err) {
          console.error("Clarifai API error:", err);
          return res.status(500).json({ error: "Error analyzing image" });
        }

        if (response.status.code !== 10000) {
          return res.status(500).json({ error: "Clarifai API failed" });
        }

        console.log(response);
        // Get the detected concepts (apparel items) from Clarifai
        const regions = response.outputs[0].data.regions;
        const captions = regions
          .map((region) => region.data.concepts[0]?.name)
          .filter(Boolean);

        if (captions.length === 0) {
          return res
            .status(400)
            .json({ error: "No apparel detected in the image" });
        }

        // Save image and caption info to the user's profile
        user.images.push({
          url: req.file.location,
          key: req.file.key,
          caption: captions.join(", "), // Join all detected concepts (apparel items)
        });

        await user.save();

        // Return response to the client with image URL and detected captions
        res.status(200).json({
          message: "Image uploaded and caption generated successfully",
          image: {
            url: req.file.location,
            key: req.file.key,
            caption: captions.join(", "), // Displaying generated captions
          },
        });
      }
    );
  } catch (error) {
    console.error("Error in /upload-image:", error);
    res.status(500).json({ error: "Error uploading image" });
  }
});

//MIX and MATCH API Endpont

app.post("/mix-and-match", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Fetch user data from the database
    const user = await collection.findById(userId);
    if (!user || !user.images || user.images.length === 0) {
      return res.status(404).json({ error: "No images found for this user" });
    }

    // Extract captions from user images
    const captions = user.images.map((image) => image.caption).filter(Boolean);

    if (captions.length === 0) {
      return res
        .status(404)
        .json({ error: "No captions found for this user's images" });
    }

    // Prepare a prompt for GPT
    const prompt = `
You are a stylist. Create an outfit by choosing one item from each category below:
${captions.map((caption, index) => `Item ${index + 1}: ${caption}`).join("\n")}

Output the outfit description as: "Outfit: [Item 1], [Item 2], [Item 3]."
        `;

    // Send the prompt to OpenAI GPT
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const outfitDescription =
      response.choices[0]?.message?.content || "No outfit generated.";

    res.status(200).json({ outfit: outfitDescription });
  } catch (error) {
    console.error("Error in /mix-and-match:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET user information

app.get("/userinfo", async (req, res) => {
  try {
    // Retrieve userId from query parameters
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ error: "Invalid User ID format" });
    }

    // Fetch the user from the database
    const user = await collection.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found against this ID" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in /userinfo:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
