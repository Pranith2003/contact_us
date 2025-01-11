const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, code, name, message, mapImage) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `Automated Email for ${name}`,
      text: `Hello ${name},\n\nYour code is: ${code}.\nMessage: ${message}\n\nBest regards,\nYour Team`,
      // Optional: Attach image
      attachments: mapImage
        ? [
            {
              filename: "map.jpg",
              content: mapImage.split(",")[1], // Decode base64 image
              encoding: "base64",
            },
          ]
        : [],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
