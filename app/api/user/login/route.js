import DB from "@/utils/db";
import { NextResponse } from "next/server";

import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await DB();
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare hashed passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create a JWT token
    const access_tone = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: "1h" } // Token expiration time
    );

    return NextResponse.json({ access_tone }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error logging in user", error },
      { status: 500 }
    );
  }
}
