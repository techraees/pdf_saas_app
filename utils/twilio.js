import twilio from 'twilio';

const client = twilio(
  process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID,
  process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
);

export const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log("SMS sent successfully:", message.sid);
    return message;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};
