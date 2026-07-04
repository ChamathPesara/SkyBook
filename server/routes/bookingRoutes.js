import express from "express";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
  getBookingById,
  downloadTicket
} from "../controllers/bookingController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.get("/:id/ticket", protect, downloadTicket);
router.get("/:id", protect, getBookingById);
router.delete("/:id", protect, cancelBooking);

export default router;