const mongoose = require("mongoose");

let Chat;

if (mongoose.models.Chat) {
  // Model already exists, use the existing one
  Chat = mongoose.model("Chat");
} else {
  // Model doesn't exist, define and compile it
  const chatModel = mongoose.Schema(
    {
      chatName: { type: String, trim: true },
      isGroupChat: { type: Boolean, default: false },
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
      groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
  );

  Chat = mongoose.model("Chat", chatModel);
}

module.exports = Chat;
