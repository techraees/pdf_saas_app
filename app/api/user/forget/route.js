import DB from "@/utils/db";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { sendEmail } from "@/utils/mailgun";
import { sendSMS } from "@/utils/twilio";
import generateJWT from "@/utils/generateJWT";

// Password Reset Request Handler
export async function POST(request) {
  await DB();

  const { email, phone } = await request.json();

  try {
    // Find user by email or phone
    const user = await User.findOne({ $or: [{ email }, { phone }] });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate reset token
    const resetToken = generateJWT(user._id);

    // Send SMS with reset link if phone number exists
    if (user.phone) {
      const resetLink = `${process.env.NEXT_PUBLIC_CLIENT_URL}/reset-password?token=${resetToken}`;
      const smsBody = `Click this link to reset your password: ${resetLink}`;

      await sendSMS(user.phone, smsBody);
    }

    // Send email with reset link
    const resetLink = `${process.env.NEXT_PUBLIC_CLIENT_URL}/reset-password?token=${resetToken}`;
    const emailSubject = "Password Reset Link";
    const emailText = `Click this link to reset your password: ${resetLink}`;

    // Assuming you have a sendEmail function as shown in the previous response
    await sendEmail(user.email, emailSubject, emailText);

    return NextResponse.json(
      { message: "Password reset instructions sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { message: "Error resetting password" },
      { status: 500 }
    );
  }
}
