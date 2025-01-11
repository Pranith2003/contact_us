const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, code, name, coordinates, location) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL || "project.1",
        pass: process.env.PASSWORD || "secret.1",
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL || "your-email@gmail.com",
      to: email,
      subject: `Automated Email for ${name}`,
      text: `Hello ${name},\n\nYour code is: ${code}.\n Needed your services at locations: location\n and coordinates: ${coordinates} \n\nBest regards,\nYour Team`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
