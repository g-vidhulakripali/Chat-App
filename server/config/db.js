// Import required libraries and modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Configure dotenv to load environment variables from a .env file
dotenv.config();

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the provided MongoDB URI
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    // Log a message to indicate successful connection to MongoDB
    console.log("MongoDB connected");
  } catch (error) {
    // Log an error message with details of the connection error
    console.error("MongoDB connection error:", error.message);

    // Exit the process with a failure status code
    process.exit(1);
  }
};

// Export the connectDB function
module.exports = connectDB;
