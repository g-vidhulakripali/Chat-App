// importing the required module mongoose
const mongoose = require("mongoose");

// defining a new mongoose schema called messageSchema
const messageSchema = new mongoose.Schema(
  {
    // the sender of the message is a reference to a User model, the message schema uses mongoose Schema Types ObjectId to reference it
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // the receiver of the message is also a reference to a User model
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // the text of the message is a string
    text: String,
  },
  { timestamps: true }
);

// creating a new mongoose model called Message, using the messageSchema
module.exports = mongoose.model("Message", messageSchema);
