import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { colors, fonts, styles, GlobalFonts } from "../components/Theme";
import TicketDivider from "../components/TicketDivider";
import LoadingScreen from "../components/LoadingScreen";

function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const { data } = await API.get(`/bookings/${id}`);
      setBooking(data);
    };

    fetchBooking();
  }, [id]);

  const handlePayment = async () => {
    try {
      const { data } = await API.post("/payments/create-session", {
        bookingId: id
      });

      // Redirect to Stripe
      window.location.href = data.url;

    } catch (err) {
      alert("Payment error");
    }
  };

  const handleCancel = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this payment? Your seat may be released."
    );
    if (confirmed) {
      navigate("/cancel");
    }
  };

  if (!booking) {
    return <LoadingScreen title="Loading booking…" subtitle="Fetching your booking details." />;
  }

  return (
    <div style={{ ...styles.page, padding: "40px 20px", display: "flex", justifyContent: "center" }}>
      <GlobalFonts />

      <div style={{ maxWidth: "460px", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <div>
            <div style={styles.eyebrow}>SKYBOOK · CHECKOUT</div>
            <h2 style={{ ...styles.h2, fontSize: "26px", color: colors.navy, margin: "8px 0 0" }}>
              Payment
            </h2>
          </div>

          <button
            onClick={() => navigate("/home")}
            style={{ ...styles.buttonGhost, color: colors.navy, border: `1.5px solid ${colors.line}`, padding: "9px 18px", fontSize: "13px" }}
          >
            ← Back to Home
          </button>
        </div>

        {/* Boarding-pass style booking summary */}
        <div style={{ ...styles.card, padding: "26px" }}>
          <p style={styles.eyebrow}>{booking.flight.airline}</p>
          <h3 style={{ ...styles.h2, fontSize: "20px", color: colors.navy, marginTop: "6px" }}>
            {booking.flight.departureCity} → {booking.flight.arrivalCity}
          </h3>

          <div style={{ margin: "20px 0" }}>
            <TicketDivider bg={colors.paper} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ color: colors.slate, fontSize: "13px" }}>Seat</span>
            <span style={{ fontFamily: fonts.mono, fontWeight: 600, color: colors.navy }}>
              {booking.seatNumber}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ color: colors.slate, fontSize: "13px" }}>Passenger</span>
            <span style={{ fontWeight: 600, color: colors.navy }}>{booking.passengerName}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: colors.slate, fontSize: "13px" }}>Total due</span>
            <span style={{ fontFamily: fonts.mono, fontWeight: 700, fontSize: "20px", color: colors.navy }}>
              ${booking.flight.price}
            </span>
          </div>
        </div>

        <button onClick={handlePayment} style={{ ...styles.button, width: "100%", marginTop: "20px" }}>
          Pay with Card 💳
        </button>

        <button
          onClick={handleCancel}
          style={{
            ...styles.buttonGhost,
            color: colors.slate,
            border: `1.5px solid ${colors.line}`,
            width: "100%",
            marginTop: "10px"
          }}
        >
          Cancel Payment
        </button>
      </div>
    </div>
  );
}

export default Payment;