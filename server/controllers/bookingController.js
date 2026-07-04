import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";
import { generateTicket } from "../utils/generateTicket.js";

// Create booking
export const createBooking = async (req, res) => {
  const { flightId, passengerName, passportNumber, seatNumber } = req.body;

  try {
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    const seatExists = flight.bookedSeats.find(
      seat => seat.seatNumber === seatNumber
    );

    if (seatExists) {
      return res.status(400).json({ message: "Seat already booked" });
    }

    flight.bookedSeats.push({
      seatNumber,
      user: req.user._id
    });

    await flight.save();

    const booking = await Booking.create({
      user: req.user._id,
      flight: flightId,
      passengerName,
      passportNumber,
      seatNumber
    });

    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("flight");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current user's bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("flight");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.bookingStatus = "cancelled";
    await booking.save();

    const flight = await Flight.findById(booking.flight);

    flight.bookedSeats = flight.bookedSeats.filter(
      seat => seat.seatNumber !== booking.seatNumber
    );

    await flight.save();

    res.json({ message: "Booking cancelled" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadTicket = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("flight");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.paymentStatus !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    await generateTicket(booking, res);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};