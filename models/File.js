const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the File schema
const fileSchema = new Schema(
  {
    id: { type: String, default: () => new mongoose.Types.ObjectId() },
    name: { type: String, required: true },
    uploadStatus: {
      type: String,
      enum: Object.values(UploadStatus),
      default: UploadStatus.PENDING,
    },
    url: { type: String, required: true },
    key: { type: String, required: true },
    userId: { type: String, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("File", fileSchema);
