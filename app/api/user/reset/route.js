import DB from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import verifyJWT from "@/utils/verifyJWT";



// Password Reset Request Handler
export async function POST(request) {
  await DB();

  const { token, newPassword } = await request.json();

  if (!token || !newPassword) {
    return NextResponse.json(
      { message: "Token and newPassword are required" },
      { status: 400 }
    );
  }

  try {
    // Verify the reset token
    const decodedToken = verifyJWT(token);
    const userId = decodedToken.userId;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { message: error.message || "Error resetting password" },
      { status: 500 }
    );
  }
}
