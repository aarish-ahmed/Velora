import { Resend } from "resend";

const sendEmail = async (email, verificationCode) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "onboarding@resend.dev", // Free default sender provided by Resend
    to: email,
    subject: "Verification Code",
    text: `Hello,\n\nThank you for signing up.\n\nYour email verification code is:\n\n${verificationCode}\n\nThis code will expire in 2 minutes.\n\nIf you did not create this account, you can safely ignore this email.\n\nRegards,\nWeb Chat Team\n`,
  });
};

export default sendEmail;