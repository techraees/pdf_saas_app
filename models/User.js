import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the User schema
const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  stripeCustomerId: { type: String, unique: true, sparse: true },
  stripeSubscriptionId: { type: String, unique: true, sparse: true },
  stripePriceId: { type: String, sparse: true },
  stripeCurrentPeriodEnd: { type: Date, sparse: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String, sparse: true },
  resetPasswordExpires: { type: Date, sparse: true },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
