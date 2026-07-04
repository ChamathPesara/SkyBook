import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true
  },

  passengerName: {
    type: String,
    required: true
  },

  passportNumber: {
    type: String,
    required: true
  },

  seatNumber: {
    type: String,
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending"
  },

  bookingStatus: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  }
},
{ timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;