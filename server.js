import express from "express";
import cors from "cors";
import "dotenv/config";
import AuthRouter from "./routes/authRoute.js";
import RequestRouter from "./routes/requestsRoute.js";
import dbConnect from "./dbconnect.js";

const app = express();

app.use("/", AuthRouter);
app.use("/api", RequestRouter);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // If you need to send cookies or auth headers
  })
);
app.use(cors());
app.use(express.json());

dbConnect();

app.get("/", (req, res) => {
  // console.log("Hello World!");
  res.send("Hello World!");
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
