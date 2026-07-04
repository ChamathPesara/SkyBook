import Flight from "../models/Flight.js";

// Create flight
export const createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all flights
export const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single flight
export const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update flight
export const updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete flight
export const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    res.json({ message: "Flight deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchFlights = async (req, res) => {
  try {
    const { departureCity, arrivalCity, date } = req.query;

    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const flights = await Flight.find({
      departureCity: {
        $regex: new RegExp(departureCity, "i")
      },
      arrivalCity: {
        $regex: new RegExp(arrivalCity, "i")
      },
      departureTime: {
        $gte: startDate,
        $lt: endDate
      }
    });

    res.json(flights);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getFlightSeats = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    const rows = ["A", "B", "C", "D", "E", "F"];
    const seatsPerRow = Math.ceil(flight.totalSeats / rows.length);

    const allSeats = [];

    rows.forEach(row => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatNumber = `${row}${i}`;
        allSeats.push(seatNumber);
      }
    });

    const seatMap = allSeats.slice(0, flight.totalSeats).map(seat => {
      const booked = flight.bookedSeats.some(
        item => item.seatNumber === seat
      );

      return {
        seatNumber: seat,
        status: booked ? "booked" : "available"
      };
    });

    res.json(seatMap);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};