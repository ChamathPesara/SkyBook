import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { colors, fonts, styles, GlobalFonts } from "../components/Theme";
import TicketDivider from "../components/TicketDivider";
import LoadingScreen from "../components/LoadingScreen";

function MyBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const downloadTicket = async (id) => {

    try {
        const response = await API.get(
            `/bookings/${id}/ticket`,
            {
            responseType:"blob"
            }
        );

        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );

        const link = document.createElement("a");

        link.href = url;
        link.download = "ticket.pdf";

        link.click();

    } catch(error){
        console.log(error);
    }

    };

  useEffect(() => {

    const fetchBookings = async () => {
      try {
        const { data } = await API.get("/bookings/my");
        setBookings(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    fetchBookings();

  }, []);

  const statusStyle = (status) => {
    const positive = ["confirmed", "paid", "success"].includes((status || "").toLowerCase());
    return {
      fontFamily: fonts.mono,
      fontSize: "12px",
      fontWeight: 600,
      color: positive ? colors.success : colors.slate,
      background: positive ? colors.successBg : colors.cloud,
      padding: "3px 10px",
      borderRadius: "999px"
    };
  };

  if (loading) {
    return (
        <LoadingScreen
        title="Loading your bookings..."
        subtitle="Please wait while we retrieve your trips."
        />
    );
    }

  return (
    <div style={{ ...styles.page, padding: "40px 20px" }}>
      <GlobalFonts />

      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "24px"
          }}
        >
          <div>
            <div style={styles.eyebrow}>SKYBOOK · MY TRIPS</div>
            <h1 style={{ ...styles.h1, fontSize: "28px", color: colors.navy, margin: "8px 0 0" }}>
              My Bookings
            </h1>
          </div>

          <button
            onClick={() => navigate("/home")}
            style={{ ...styles.buttonGhost, color: colors.navy, border: `1.5px solid ${colors.line}`, padding: "9px 18px", fontSize: "13px" }}
          >
            ← Back to Home
          </button>
        </div>

        {bookings.length === 0 ? (
          <div style={{ ...styles.card, padding: "36px", textAlign: "center" }}>
            <p style={{ color: colors.slate }}>No bookings found yet — go search for a flight.</p>
          </div>
        ) : (

          bookings.map((booking) => (

            <div
              key={booking._id}
              style={{ ...styles.card, padding: "24px", marginBottom: "18px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h2 style={{ ...styles.h2, fontSize: "18px", color: colors.navy }}>
                    {booking.flight.airline}
                  </h2>
                  <p style={{ fontFamily: fonts.mono, color: colors.slate, margin: "6px 0 0", fontSize: "14px" }}>
                    ✈ {booking.flight.departureCity} → {booking.flight.arrivalCity}
                  </p>
                </div>
                <span style={{ fontFamily: fonts.mono, fontSize: "13px", color: colors.slate }}>
                  {booking.flight.flightNumber}
                </span>
              </div>

              <div style={{ margin: "18px 0" }}>
                <TicketDivider bg={colors.paper} />
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "22px", marginBottom: "18px" }}>
                <div>
                  <p style={{ ...styles.label, marginBottom: "2px" }}>Passenger</p>
                  <p style={{ margin: 0, color: colors.navy, fontWeight: 600 }}>{booking.passengerName}</p>
                </div>
                <div>
                  <p style={{ ...styles.label, marginBottom: "2px" }}>Seat</p>
                  <p style={{ margin: 0, fontFamily: fonts.mono, fontWeight: 600, color: colors.navy }}>{booking.seatNumber}</p>
                </div>
                <div>
                  <p style={{ ...styles.label, marginBottom: "2px" }}>Booking status</p>
                  <span style={statusStyle(booking.bookingStatus)}>{booking.bookingStatus}</span>
                </div>
                <div>
                  <p style={{ ...styles.label, marginBottom: "2px" }}>Payment</p>
                  <span style={statusStyle(booking.paymentStatus)}>{booking.paymentStatus}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>

                <button
                  onClick={() => downloadTicket(booking._id)}
                  style={{ ...styles.button, padding: "9px 18px", fontSize: "13px" }}
                >
                  Download Ticket
                </button>
              </div>
            </div>

          ))

        )}
      </div>
    </div>
  );
}

export default MyBookings;