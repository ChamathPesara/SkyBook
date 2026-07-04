import express from "express";
import {
  createFlight,
  getFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
  searchFlights,
  getFlightSeats
} from "../controllers/flightController.js";

const router = express.Router();

router.post("/", createFlight);
router.get("/search", searchFlights);
router.get("/", getFlights);
router.get("/:id/seats", getFlightSeats);
router.get("/:id", getFlightById);
router.put("/:id", updateFlight);
router.delete("/:id", deleteFlight);

export default router;