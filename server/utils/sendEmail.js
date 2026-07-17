const sendEmail = async (email, verificationCode) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { 
        name: "Velora-x Team", 
        email: process.env.SENDER_EMAIL || "aarishahmed96@gmail.com"
      },
      to: [{ email: email }],
      subject: "Verification Code",
      textContent: `Hello,\n\nThank you for signing up.\n\nYour email verification code is:\n\n${verificationCode}\n\nThis code will expire in 2 minutes.\n\nIf you did not create this account, you can safely ignore this email.\n\nRegards,\nWeb Chat Team\n`,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Brevo API Rejected the Email:", data);
    throw new Error(data.message || "Failed to send verification email");
  }

  console.log("Email successfully sent via Brevo Message ID:", data.messageId);
};

export default sendEmail;