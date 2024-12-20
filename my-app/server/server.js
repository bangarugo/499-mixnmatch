const express = require("express");
const axios = require("axios");
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
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Add your API key in .env
// Import the config file, which connects to MongoDB
const collection = require("./config");

const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"], // Add DELETE here
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

//S3 CLIENT Initialization
const s3 = new S3Client({
  region: process.env.AWS_REGION_NAME,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Passport setup
initializePassport(passport);
app.use(
  session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middleware to check authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // If authenticated, continue to the profile page
  }
  res.status(401).json({ error: "Unauthorized access" }); // If not authenticated, return 401
}

// Routes and other logic
app.get("/", (req, res) => {
  res.redirect("/home");
});
// Route to render login
app.get("/login", (req, res) => {
  res.json({ message: "Login Page", error: req.flash("error_msg") });
});

// Route to render register
app.get("/register", (req, res) => {
  res.json({ message: "Register Page", error: req.flash("error_msg") });
});

//Route to profile
app.get("/profile", ensureAuthenticated, (req, res) => {
  res.render("profile", { user: req.user });
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
    res.status(200).json({ message: `Welcome ${user.firstName}`,  user: { email: user.email, name: user.firstName } });
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

// FashionVLM-based Upload Route
app.post("/upload-image", upload.single("image"), async (req, res) => {
  const { userId, category } = req.body;

  // Validate userId
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await collection.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // S3 URL of the uploaded image
    const imagePath = req.file.location;

    // Send the imagePath to the Python API for analysis
    // Send the imagePath to the Python API for analysis
    const pythonApiUrl = "http://127.0.0.1:8000/analyze-image/";
    const response = await axios.post(
      pythonApiUrl,
      { imagePath }, // Sending JSON data
      {
        headers: {
          "Content-Type": "application/json", // Set the correct content type
        },
      }
    );

    function normalizeCaption(caption) {
      // Define stop words
      const stopWords = new Set([
        "a",
        "the",
        "of",
        "on",
        "with",
        "and",
        "to",
        "in",
        "is",
        "for",
        "it",
        "this",
        "by",
        "an",
        "as",
        "at",
        "from",
        "there",
        "that",
        "ground",
        "are",
        "close",
        "up",
        "man",
        "standing",
        "street",
      ]);

      // Normalize the caption by converting to lowercase, removing punctuation, and trimming extra spaces
      const normalizedCaption = caption
        .toLowerCase()
        .replace(/[-]/g, " ") // Replace dashes with spaces
        .replace(/[^\w\s]/g, "") // Remove punctuation
        .replace(/\s+/g, " ") // Replace multiple spaces with a single space
        .trim(); // Trim spaces from start and end

      // Remove stop words from the caption
      const words = normalizedCaption.split(" ");
      const filteredWords = words.filter((word) => !stopWords.has(word));

      // Return the cleaned-up caption by joining the remaining words
      return filteredWords.join(" ");
    }

    const { caption, error } = response.data;

    if (error) {
      return res.status(400).json({ error });
    }

    const normalizedCaption = normalizeCaption(caption);

    // Save image details to the user's profile under the selected category
    user.images.push({
      url: req.file.location,
      key: req.file.key,
      caption: normalizedCaption,
      category,
    });

    await user.save();

    res.status(200).json({
      message: "Image uploaded and categorized successfully",
      image: {
        url: req.file.location,
        key: req.file.key,
        caption: normalizedCaption,
        category,
      },
    });
  } catch (error) {
    console.error("Error in /upload-image:", error);
    res.status(500).json({ error: "Error uploading image" });
  }
});

// Delete Image Endpoint
app.delete("/delete-image/:imageId", async (req, res) => {
  const { imageId } = req.params;

  try {
    // Find the user by their user ID (you may want to add authentication here)
    const user = await collection.findOne({ "images._id": imageId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the image from the user's images array
    const imageIndex = user.images.findIndex(
      (image) => image._id.toString() === imageId
    );

    if (imageIndex === -1) {
      return res.status(404).json({ error: "Image not found" });
    }

    const imageToDelete = user.images[imageIndex];

    // Remove image from the array
    user.images.splice(imageIndex, 1);

    // Optionally, delete the image from S3
    const s3Params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: imageToDelete.key,
    };
    await s3.send(new DeleteObjectCommand(s3Params));

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting image" });
  }
});

//MIX and MATCH API Endpoint
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

    // Extract clothing categories and captions from user images
    const categorizedImages = user.images.reduce((acc, image) => {
      const { caption, url, category } = image;
      if (category) {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({ caption: caption.toLowerCase(), url });
      }
      return acc;
    }, {});

    // Define required categories (may not all have items)
    const requiredCategories = [
      "headwear",
      "tops",
      "shirts",
      "pants",
      "footwear",
    ];

    // Find missing categories, but don't return an error if they are empty
    const missingCategories = requiredCategories.filter(
      (category) =>
        !categorizedImages[category] || categorizedImages[category].length === 0
    );

    // Prepare the list of categories with available items
    const availableCategories = requiredCategories.filter(
      (category) =>
        categorizedImages[category] && categorizedImages[category].length > 0
    );

    const preMessage = {
      role: "system",
      content:
        "You are a strict fashion assistant. Always ensure the outfit adheres strictly to the rules given in the prompt. Any deviation is unacceptable.",
    };

    // Prepare the prompt for GPT based on available categories
    const prompt = `
You are an expert fashion stylist. Below is a list of clothing items categorized by type. Your task is to create a stylish and balanced outfit by selecting one item from each category that has available items. Ensure that no two items belong to the same category, and each outfit is unique and randomized.

Here are the categories and available items:

${availableCategories
  .map(
    (category) =>
      `${category}:\n${(categorizedImages[category] || [])
        .map((item) => `- "${item.caption}"`)
        .join("\n")}`
  )
  .join("\n\n")}

Please select **exactly one caption** from each category with available items to create an outfit. But if an item from the "tops" category does not fits with the outfit you can leave out the top category in your response.
 Randomize your selection to ensure the outfit is different each time this request is made.

Respond in the following format:
"Outfit: headwear Item, tops Item, shirts Item, pants Item, footwear Item"...

If from available categories there is a category which has no item, then dont send that category item in your response.
For example if headwear category does not have any item in it your suggested outfit should be:
"Outfit:  tops Item, shirts Item, pants Item, footwear Item"...

If an item from the "tops" item does not fits in with the outfit then you can leave it as it is.

For example if the tops item does not fit in with the outfit you can Respond in the following format:
"Outfit: headwear caption, tops caption, shirts caption, pants caption, footwear caption"

Apart from "tops" category every other category item is a must.

Remember:
1. Each caption in the outfit must come from a distinct category.
2. The response should be unique and random every time.
3. Avoid selecting multiple items from the same category.
4. The captions in your response should be exactly same as you recieve it.

Make sure to follow the following format carefully to create a stylish outfit:

Example: "outfit": "tops 'green jacket jeans against wall', shirts 'wearing tan shirt jeans', pants 'north face pants grey', footwear 'nike air zoom low black white'"

Create the outfit now.
`;

    // Send the prompt to OpenAI GPT
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [preMessage, { role: "user", content: prompt }],
    });

    const outfitDescription =
      response.choices[0]?.message?.content || "No outfit generated.";

    // Clean the outfit description before sending it in the response
    const cleanedOutfitDescription = outfitDescription
      .match(/Outfit:\s*(.*)/)?.[1] // Extract the text after "Outfit:"
      .replace(/["]/g, "") // Remove quotes
      .trim();

    res.status(200).json({
      outfit: cleanedOutfitDescription,
      missingCategories, // Return the categories that have no images
    });
  } catch (error) {
    console.error("Error in /mix-and-match:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Save Outfit Endpoint
app.post("/save-outfit", async (req, res) => {
  const { userId, outfitImages, isFavorite } = req.body;

  if (!userId || !outfitImages || outfitImages.length === 0) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    const user = await collection.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.savedOutfits.push({ outfitImages, isFavorite: !!isFavorite });
    await user.save();

    res.status(200).json({ message: "Outfit saved successfully" });
  } catch (error) {
    console.error("Error saving outfit:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Retreive Saved Outfits Endpoint
app.get("/saved-outfits", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await collection.findById(userId).select("savedOutfits");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ savedOutfits: user.savedOutfits });
  } catch (error) {
    console.error("Error fetching saved outfits:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//DELETE SAVED OUTFITS
// Delete Saved Outfit Endpoint
app.delete("/delete-outfit", async (req, res) => {
  const { userId, outfitId } = req.body;

  if (!userId || !outfitId) {
    return res
      .status(400)
      .json({ error: "User ID and Outfit ID are required" });
  }

  try {
    const user = await collection.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the outfit with the given ID
    user.savedOutfits = user.savedOutfits.filter(
      (outfit) => outfit._id.toString() !== outfitId
    );
    await user.save();

    res.status(200).json({ message: "Outfit deleted successfully" });
  } catch (error) {
    console.error("Error deleting outfit:", error);
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
