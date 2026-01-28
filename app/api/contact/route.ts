import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Initialize AWS SES Client
const sesClient = new SESClient({
  region: process.env.AWS_SES_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Log the submission
    console.log("Contact form submission received:");
    console.log({
      name,
      email,
      phone: phone || "Not provided",
      message,
      timestamp: new Date().toISOString(),
    });

    // Send email via AWS SES
    const emailParams = {
      Source: process.env.SMTP_FROM || "noreply@example.com",
      Destination: {
        ToAddresses: [process.env.CONTACT_EMAIL || "contact@example.com"],
      },
      Message: {
        Subject: {
          Data: `New Contact Form Submission from ${name}`,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    h2 { color: #0066cc; border-bottom: 2px solid #0066cc; padding-bottom: 10px; }
    .info-row { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 4px; }
    .label { font-weight: bold; color: #555; }
    .message-box { background: #fff; border-left: 4px solid #0066cc; padding: 15px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h2>New Contact Form Submission</h2>
    <div class="info-row">
      <span class="label">Name:</span> ${name}
    </div>
    <div class="info-row">
      <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
    </div>
    <div class="info-row">
      <span class="label">Phone:</span> ${phone || "Not provided"}
    </div>
    <div class="message-box">
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>
    </div>
    <hr>
    <p style="color: #888; font-size: 12px;">
      Submitted on: ${new Date().toLocaleString()}
    </p>
  </div>
</body>
</html>
            `,
            Charset: "UTF-8",
          },
          Text: {
            Data: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

Message:
${message}

---
Submitted on: ${new Date().toLocaleString()}
            `,
            Charset: "UTF-8",
          },
        },
      },
      ReplyToAddresses: [email],
    };

    const command = new SendEmailCommand(emailParams);
    await sesClient.send(command);

    console.log("Email sent successfully via AWS SES");

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
