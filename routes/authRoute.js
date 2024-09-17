// routes/authRoutes.js
import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // If you need to send cookies or auth headers
  })
);
router.use(cors());

const salt = 12;

// Existing register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ error: "User already exists" });
    }

    console.log(user);
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "14d",
    });
    // Set a cookie with the JWT token, to be sent back with each request
    // httpOnly flag ensures that the cookie is only accessible by the web server
    // and not by any client-side script, which reduces the risk of cross-site
    // scripting attacks (XSS). The maxAge option sets the cookie to expire in
    // 14 days. The secure flag ensures that the cookie is only sent over HTTPS
    // connections, which is important because we don't want to send the JWT
    // token over an unencrypted connection. This is only set when the server
    // is running in production mode, as determined by the NODE_ENV environment
    // variable. In development mode, this is not set and the cookie is sent
    // over an unencrypted connection.
    // res.cookie(
    //   "authToken",
    //   token,
    //   { httpOnly: true },
    //   { maxAge: 14 * 24 * 60 * 60 * 1000 },
    //   { secure: process.env.NODE_ENV === "production" }
    // );
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// New login route
router.post("/login", async (req, res) => {
  router.use(express.json());
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "14d",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
