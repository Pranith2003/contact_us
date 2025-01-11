const express = require("express");
const cors = require("cors");
const sendEmail = require("./emailService");

const app = express();
app.use(express.json());

let corsOptions = {
  origin: ["http://127.0.0.1:5500"],
  methods: "GET,POST",
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

app.post("/send-email", async (req, res) => {
  const { email, code, name, coordinates, location } = req.body;
  // console.log(req.body)

  try {
    const result = await sendEmail(email, code, name, coordinates, location);
    // console.log(result);
    // alert("Email sent successfully!");
    res.status(200).send({ message: "Email sent successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Failed to send email", error });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
