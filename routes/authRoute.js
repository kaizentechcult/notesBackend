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
    res.cookie(
      "authToken",
      token,
      { httpOnly: true },
      { maxAge: 14 * 24 * 60 * 60 * 1000 },
      { secure: process.env.NODE_ENV === "production" }
    );
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
