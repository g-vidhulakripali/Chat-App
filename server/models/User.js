// Import the mongoose module
const mongoose = require("mongoose");

// Create a new mongoose.Schema instance for the User model
const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Register the User model with mongoose using the schema defined above
module.exports = mongoose.model("User", userSchema);
