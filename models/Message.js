const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Message schema
const messageSchema = new Schema(
  {
    id: { type: String, default: () => new mongoose.Types.ObjectId() },
    text: { type: String, required: true },
    isUserMessage: { type: Boolean, required: true },
    userId: { type: String, ref: "User" },
    fileId: { type: String, ref: "File" },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
