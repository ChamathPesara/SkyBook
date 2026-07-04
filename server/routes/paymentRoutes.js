import express from "express";
import {
  createPaymentSession,
  webhookHandler,
  confirmPayment
} from "../controllers/paymentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Stripe webhook (NO protect middleware)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookHandler
);

router.post("/create-session", protect, createPaymentSession);
router.post("/confirm", protect, confirmPayment);

export default router;