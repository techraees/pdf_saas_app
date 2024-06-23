import DB from "@/utils/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function GET(request, { params: { token } }) {
  await DB();

  if (!token) {
    return NextResponse.json(
      { message: "Token is missing in query parameters" },
      { status: 401 }
    );
  }

  try {
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    const userId = decodedToken.userId;

    // Find user by ID
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ message: "Token expired" }, { status: 401 });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    } else {
      return NextResponse.json(
        { message: "Error verifying token", error },
        { status: 500 }
      );
    }
  }
}
