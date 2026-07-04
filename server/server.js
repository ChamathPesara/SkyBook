import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { webhookHandler } from "./controllers/paymentController.js";

// connect database
connectDB();

const app = express();

app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  webhookHandler
);

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Air Ticketing API is running...");
});

// server port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});