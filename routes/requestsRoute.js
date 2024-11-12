// routes/authRoutes.js
import express from "express";
import Request from "../models/Request.js";
import cors from "cors";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// router.use(
//   cors({
//     origin: "http://localhost:3000", // Frontend URL
//     credentials: true, // If you need to send cookies or auth headers
//   })
// );
router.use(cors());

router.post("/request", async (req, res) => {
  const { name, data } = req.body;
  if (!name || !data) {
    return res.status(400).json({ error: "Name and data are required" });
  }
  try {
    const requestData = new Request({ name, data });
    await requestData.save();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
