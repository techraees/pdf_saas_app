// models/user.ts
import mongoose from "mongoose";

export const UserModel =
  mongoose.models.User ||
  mongoose.model(
    "User",
    new Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      age: { type: Number, required: true },
    })
  );
