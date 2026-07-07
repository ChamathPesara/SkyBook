import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import { colors, fonts, styles, GlobalFonts } from "../components/Theme";
import TicketDivider from "../components/TicketDivider";

function Booking() {
  const { id } = useParams();

  const [flight, setFlight] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState("");

  const [form, setForm] = useState({
    passengerName: "",
    passportNumber: ""
  });

  useEffect(() => {
    const fetchFlight = async () => {
      const { data } = await API.get(`/flights/${id}`);
      setFlight(data);
    };

    fetchFlight();
  }, [id]);

  // Generate seats A1–A10
  const seats = Array.from({ length: 30 }, (_, i) => `A${i + 1}`);

  const isBooked = (seat) => {
    return flight?.bookedSeats?.some(s => s.seatNumber === seat);
  };

  const handleBooking = async () => {
    try {
      const { data } = await API.post("/bookings", {
        flightId: id,
        seatNumber: selectedSeat,
        passengerName: form.passengerName,
        passportNumber: form.passportNumber
      });

      console.log("Created booking:", data);

      alert("Booking created! Proceeding to payment...");

      window.location.href = `/payment/${data._id}`;

    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Error creating booking");
    }
  };

  if (!flight) {
    return (
      <div style={{ ...styles.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <GlobalFonts />
        <p style={{ color: colors.slate, fontFamily: fonts.mono }}>Loading flight…</p>
      </div>
    );
  }

  const seatStyle = (seat) => ({
    width: "40px",
    height: "40px",
    margin: "5px",
    textAlign: "center",
    lineHeight: "40px",
    borderRadius: "8px",
    fontFamily: fonts.mono,
    fontSize: "13px",
    fontWeight: 600,
    cursor: isBooked(seat) ? "not-allowed" : "pointer",
    border: `1px solid ${selectedSeat === seat ? colors.amberDeep : colors.line}`,
    color: isBooked(seat) ? "#9AA1AC" : selectedSeat === seat ? colors.navyDeep : colors.navy,
    background: isBooked(seat) ? colors.booked : selectedSeat === seat ? colors.amber : "#fff",
    transition: "background 0.15s ease"
  });

  return (
    <div style={{ ...styles.page, padding: "40px 20px" }}>
      <GlobalFonts />

      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {/* Flight header */}
        <div style={{ ...styles.card, padding: "24px", marginBottom: "24px" }}>
          <div style={styles.eyebrow}>BOARDING · SEAT SELECTION</div>
          <h2 style={{ ...styles.h2, fontSize: "24px", color: colors.navy, marginTop: "8px" }}>
            {flight.airline}
          </h2>
          <p style={{ fontFamily: fonts.mono, color: colors.slate, marginTop: "4px" }}>
            {flight.departureCity} → {flight.arrivalCity}
          </p>
        </div>

        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {/* Seat map */}
          <div style={{ ...styles.card, padding: "24px", flex: "1 1 320px" }}>
            <h3 style={{ ...styles.h2, fontSize: "16px", color: colors.navy, marginBottom: "6px" }}>
              Select Seat
            </h3>
            <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: colors.slate, marginBottom: "14px" }}>
              <span><span style={{ ...swatch, background: "#fff", border: `1px solid ${colors.line}` }} /> Available</span>
              <span><span style={{ ...swatch, background: colors.amber }} /> Selected</span>
              <span><span style={{ ...swatch, background: colors.booked }} /> Booked</span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "270px" }}>
              {seats.map((seat) => (
                <div
                  key={seat}
                  onClick={() => !isBooked(seat) && setSelectedSeat(seat)}
                  style={seatStyle(seat)}
                >
                  {seat}
                </div>
              ))}
            </div>

            <p style={{ marginTop: "14px", fontFamily: fonts.mono, fontSize: "14px", color: colors.navy }}>
              Selected: {selectedSeat || "—"}
            </p>
          </div>

          {/* Passenger form as a ticket stub */}
          <div style={{ ...styles.card, padding: "24px", flex: "1 1 280px" }}>
            <h3 style={{ ...styles.h2, fontSize: "16px", color: colors.navy, marginBottom: "16px" }}>
              Passenger Details
            </h3>

            <label style={styles.label}>Passenger name</label>
            <input
              style={styles.input}
              placeholder="Full name as on passport"
              onChange={(e) => setForm({ ...form, passengerName: e.target.value })}
            />
            <div style={{ height: "16px" }} />

            <label style={styles.label}>Passport number</label>
            <input
              style={styles.input}
              placeholder="e.g. N1234567"
              onChange={(e) => setForm({ ...form, passportNumber: e.target.value })}
            />

            <div style={{ margin: "20px 0" }}>
              <TicketDivider bg={colors.paper} />
            </div>

            <button
              onClick={handleBooking}
              disabled={!selectedSeat}
              style={{ ...(selectedSeat ? styles.button : styles.buttonDisabled), width: "100%" }}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const swatch = {
  display: "inline-block",
  width: "10px",
  height: "10px",
  borderRadius: "3px",
  marginRight: "5px",
  verticalAlign: "middle"
};

export default Booking;