const express = require("express");
const cors = require("cors");

var jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const salt = 12;

require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

const dbUrl = "mongodb://127.0.0.1/Flashcard";
main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const FlashcardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const user = mongoose.model("user", FlashcardSchema);

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.send("Hello World!");
});

const User = mongoose.model("user", FlashcardSchema);

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({
        message: "Incorrect username or password",
      });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({
        message: "Incorrect username or password",
      });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, {
      sameSite: "None",
      secure: true,
    });
    res.json({ message: "success", jwt_token: token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/register", (req, res) => {
  const newUser = new user(req.body);
  console.log(req.body);
  bcrypt.genSalt(salt, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      console.log(newUser);
      newUser
        .save()
        .then((data) => {
          console.log(data);
          res.send({ message: "success" });
        })
        .catch((error) => {
          res.send({ message: "user already exist" });
        });
    });
  });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});