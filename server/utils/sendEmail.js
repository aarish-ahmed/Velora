import nodemailer from "nodemailer";

const sendEmail = async (email, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verification Code",
    text: `Hello,\n\nThank you for signing up.\n\nYour email verification code is:\n\n${verificationCode}\n\nThis code will expire in 2 minutes.\n\nIf you did not create this account, you can safely ignore this email.\n\nRegards,\nWeb Chat Team\n`,
  });
};

export default sendEmail;
