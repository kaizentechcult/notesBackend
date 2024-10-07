// routes/authRoutes.js
import cors from "cors";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import sendMail from "../mailer.js";
import User from "../models/User.js";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

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

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    await sendMail(name, email, OTP);

    user.OTP = OTP;
    user.verified = false;

    console.log(user);
    await user.save();
    return res
      .status(201)
      .json({ message: "User created successfully", userEmail: email });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
router.post("/verify", async (req, res) => {
  const { email, OTP } = req.body;

  console.log(email, OTP);
  try {
    const user = await User.findOne({ email });
    if (user.OTP !== OTP) {
      return res.status(401).json({ error: "Invalid OTP" });
    }
    await User.updateOne({ email }, { $set: { verified: true } });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "14d",
    });
    return res.status(201).json({ token: token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// New login route
// router.post("/login", async (req, res) => {
//   router.use(express.json());
//   const { email, password } = req.body;
//   console.log(req.body);
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({ error: "Invalid email" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password, (err, result) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       if (!result) {
//         return res.status(400).json({ error: "Invalid credentials" });
//       }
//     });
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "14d",
//     });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.post("/login", async (req, res) => {
  router.use(express.json());
  const { email, password } = req.body;
  console.log(req.body);
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
