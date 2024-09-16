// routes/authRoutes.js
import express from "express";
const router = express.Router();
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
