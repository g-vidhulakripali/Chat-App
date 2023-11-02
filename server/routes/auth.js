const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  try {
    console.log(req.body, "oooooooos");
    const { fullname, username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Return user data
    res.json({
      userId: user._id,
      username: user.username,
      // Add other user data as needed
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Logout
router.post("/logout", async (req, res) => {
  try {
    // Clear session cookie
    req.session = null;
    res.clearCookie("session");

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update User Profile
router.put("/profile", async (req, res) => {
  try {
    const { username, fullname } = req.body;

    // Check if user exists
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user data
    await User.updateOne({ _id: req.userId }, { $set: { username, fullname } });

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get User Profile
router.get("/profile/:userId", async (req, res) => {
  try {
    // Find user by ID
    // console.log("Attempting to find user by ID:", req.params.userId);
    const user = await User.findById({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data
    res.json({
      userId: user._id,
      username: user.username,
      fullname: user.fullname,
      // Add other user data as needed
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const user = await User.find({});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
