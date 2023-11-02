const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const mongoose = require("mongoose");

router.post("/send", async (req, res) => {
  const { sender, receiver, text } = req.body;
  console.log(req.body);
  try {
    const newMessage = await Message.create({ sender, receiver, text });
    res.json(newMessage);
  } catch (error) {
    console.error("Error sending message", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:userId/:otherUserId", async (req, res) => {
  const { userId, otherUserId } = req.params; // Corrected destructuring
  //   console.log("userId:", userId, "otherUserId:", otherUserId);
  try {
    const messages = await Message.find({
      sender: mongoose.Types.ObjectId(userId),
      receiver: mongoose.Types.ObjectId(otherUserId),
    });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
