import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import axios from "axios";

import todoRoute from "./routes/todo.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // fallback port
const DBURI = process.env.MONGODB_URL;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// database connection code
mongoose
  .connect(DBURI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((error) => console.error(" MongoDB connection error:", error));

// routes
app.use("/todo", todoRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("hello world");
});

// Keep server awake on Render
const PING_URL = process.env.PING_URL;
setInterval(async () => {
  try {
    const response = await axios.get(PING_URL);
    console.log(`Pinged server: ${PING_URL} — Status: ${response.status}`);
  } catch (err) {
    console.error("Ping failed:", err.message);
  }
}, 5 * 60 * 1000); // every 5 minutes

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
