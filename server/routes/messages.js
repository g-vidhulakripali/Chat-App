const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const mongoose = require("mongoose");

router.post(
  "/send", // handle message sending request
  async (req, res) => {
    const { sender, receiver, text } = req.body;
    console.log(req.body);

    try {
      // create new message
      const newMessage = await Message.create({ sender, receiver, text });

      // respond with new message data
      res.json(newMessage);
    } catch (error) {
      console.error("Error sending message", error);

      // respond with server error
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get("/:userId/:otherUserId", async (req, res) => {
  const { userId, otherUserId } = req.params; // Destructuring IDs

  try {
    const messages = await Message.find({
      // Find messages
      sender: mongoose.Types.ObjectId(userId), // Match sender ID
      receiver: mongoose.Types.ObjectId(otherUserId), // Match receiver ID
    });

    res.json(messages); // Return messages as JSON
  } catch (error) {
    console.error("Error fetching messages", error); // Log error
    res.status(500).json({ error: "Internal Server Error" }); // Send error response
  }
});

module.exports = router;
