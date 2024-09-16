// server.js
import express from "express";
import mongoose from "mongoose";
import router from "./routes/registerRoute.js";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/your_db_name");

app.use("/api/auth", router);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
