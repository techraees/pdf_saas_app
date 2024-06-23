// utils/mailgun.js
import mailgun from "mailgun-js";

const mg = mailgun({
  apiKey: process.env.NEXT_PUBLIC_MAILGUN_API_KEY,
  domain: process.env.NEXT_PUBLIC_MAILGUN_DOMAIN,
});

export const sendEmail = (to, subject, text) => {
  const data = {
    from: "YourApp <no-reply@yourdomain.com>",
    to,
    subject,
    text,
  };

  return mg.messages().send(data);
};
