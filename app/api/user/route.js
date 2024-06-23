import DB from "@/utils/db";
import { NextResponse } from "next/server";

import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { sendEmail } from "@/utils/mailgun";
import crypto from "crypto";

export async function POST(request) {
  await DB();
  const { id, email, password, phone } = await request.json();

  if (!email || !password || !phone) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      phone,
    });

    await user.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user", error },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  await DB();

  try {
    const users = await User.find({});
    return NextResponse.json({ status: "success", users }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user", error },
      { status: 500 }
    );
  }
}
