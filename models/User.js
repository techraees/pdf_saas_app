const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the UploadStatus enum
const UploadStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  FAILED: "FAILED",
  SUCCESS: "SUCCESS",
};

// Define the User schema
const userSchema = new Schema({
  id: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  uploadStatus: {
    type: String,
    enum: Object.values(UploadStatus),
    default: "PENDING",
  },
  stripeCustomerId: { type: String, unique: true, sparse: true },
  stripeSubscriptionId: { type: String, unique: true, sparse: true },
  stripePriceId: { type: String, sparse: true },
  stripeCurrentPeriodEnd: { type: Date, sparse: true },
});

export default mongoose.model("User", userSchema);
