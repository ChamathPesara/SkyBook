import { useEffect, useState } from "react";
import API from "../services/api";
import { useSearchParams, useNavigate } from "react-router-dom";
import { colors, fonts, styles, GlobalFonts } from "../components/Theme";
import TicketDivider from "../components/TicketDivider";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        if (!bookingId) return;

        const { data } = await API.get(`/bookings/${bookingId}`);
        setBooking(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const downloadTicket = async () => {
    try {
      const response = await API.get(
        `/bookings/${booking._id}/ticket`,
        {
          responseType: "blob"
        }
      );

      const file = new Blob([response.data], {
        type: "application/pdf"
      });

      const url = window.URL.createObjectURL(file);

      const link = document.createElement("a");

      link.href = url;
      link.download = `ticket-${booking._id}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.log(err);
      alert("Unable to download ticket.");
    }
  };

  if (!booking) {
    return (
      <div style={{ ...styles.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <GlobalFonts />
        <p style={{ color: colors.slate, fontFamily: fonts.mono }}>Processing payment…</p>
      </div>
    );
  }

  return (
    <div style={{ ...styles.page, padding: "40px 20px" }}>
      <GlobalFonts />

      <div style={{ maxWidth: "520px", margin: "0 auto" }}>
        {/* SUCCESS HEADER */}
        <div
          style={{
            textAlign: "center",
            background: colors.successBg,
            padding: "22px",
            borderRadius: "16px",
            marginBottom: "20px",
            border: `1px solid ${colors.success}22`
          }}
        >
          <h1 style={{ ...styles.h1, fontSize: "24px", color: colors.success }}>✔ Payment Successful</h1>
          <p style={{ color: colors.slate, marginTop: "4px" }}>Your booking has been confirmed</p>
        </div>

        {/* BOARDING PASS CARD */}
        <div style={{ ...styles.card, padding: "28px" }}>
          <div style={styles.eyebrow}>{booking.flight.airline}</div>
          <h2 style={{ ...styles.h2, fontSize: "22px", color: colors.navy, marginTop: "6px" }}>
            {booking.flight.departureCity} → {booking.flight.arrivalCity}
          </h2>

          <div style={{ margin: "20px 0" }}>
            <TicketDivider bg={colors.paper} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: "14px" }}>
            <div>
              <p style={{ ...styles.label, marginBottom: "2px" }}>Passenger</p>
              <p style={{ margin: 0, color: colors.navy, fontWeight: 600 }}>{booking.passengerName}</p>
            </div>
            <div>
              <p style={{ ...styles.label, marginBottom: "2px" }}>Passport</p>
              <p style={{ margin: 0, fontFamily: fonts.mono, color: colors.navy }}>{booking.passportNumber}</p>
            </div>
            <div>
              <p style={{ ...styles.label, marginBottom: "2px" }}>Seat</p>
              <p style={{ margin: 0, fontFamily: fonts.mono, fontWeight: 600, color: colors.navy }}>{booking.seatNumber}</p>
            </div>
            <div>
              <p style={{ ...styles.label, marginBottom: "2px" }}>Booking status</p>
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: colors.success,
                  background: colors.successBg,
                  padding: "3px 10px",
                  borderRadius: "999px"
                }}
              >
                {booking.bookingStatus.toUpperCase()}
              </span>
            </div>
            <div>
              <p style={{ ...styles.label, marginBottom: "2px" }}>Payment</p>
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: colors.success,
                  background: colors.successBg,
                  padding: "3px 10px",
                  borderRadius: "999px"
                }}
              >
                {booking.paymentStatus.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div style={{ marginTop: "24px", textAlign: "center", display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/my-bookings")}
            style={{ ...styles.buttonGhost, color: colors.navy, border: `1.5px solid ${colors.line}` }}
          ></button>
          
          <button onClick={downloadTicket} style={styles.button}>
            Download Ticket
          </button>

          <button
            onClick={() => navigate("/home")}
            style={{ ...styles.buttonGhost, color: colors.navy, border: `1.5px solid ${colors.line}` }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;