import { useState } from "react";
import API from "../services/api";
import { colors, fonts, styles, GlobalFonts } from "../components/Theme";
import TicketDivider from "../components/TicketDivider";
import NavBar from "../components/Navbar";

function Home() {
  const [search, setSearch] = useState({
    departureCity: "",
    arrivalCity: ""
  });

  const [flights, setFlights] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    const { data } = await API.get("/flights/search", {
      params: search
    });

    setFlights(data);
    setSearched(true);
  };

  return (
    <div style={styles.page}>
      <GlobalFonts />
      <NavBar />

      {/* HERO */}
      <div
        style={{
          background: `linear-gradient(160deg, ${colors.navy} 0%, ${colors.navyDeep} 100%)`,
          color: "white",
          padding: "56px 20px 100px",
          textAlign: "center"
        }}
      >
        <div style={styles.eyebrow}>SKYBOOK · FLIGHT SEARCH</div>
        <h1 style={{ ...styles.h1, fontSize: "36px", marginTop: "10px" }}>
          Book Your Next Flight ✈
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", marginTop: "8px" }}>
          Fast, secure and easy flight booking
        </p>
      </div>

      {/* SEARCH CARD — overlaps the hero like a boarding counter desk */}
      <div style={{ maxWidth: "820px", margin: "-56px auto 0", padding: "0 20px" }}>
        <div style={{ ...styles.card, padding: "26px" }}>
          <form
            onSubmit={handleSearch}
            style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-end" }}
          >
            <div style={{ flex: "1 1 180px" }}>
              <label style={styles.label}>From</label>
              <input
                style={styles.input}
                placeholder="Departure city"
                onChange={(e) => setSearch({ ...search, departureCity: e.target.value })}
              />
            </div>

            <div style={{ flex: "1 1 180px" }}>
              <label style={styles.label}>To</label>
              <input
                style={styles.input}
                placeholder="Arrival city"
                onChange={(e) => setSearch({ ...search, arrivalCity: e.target.value })}
              />
            </div>

            <button type="submit" style={{ ...styles.button, height: "46px" }}>
              Search
            </button>
          </form>
        </div>
      </div>

      {/* RESULTS */}
      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "36px 20px" }}>
        {searched && flights.length === 0 && (
          <p style={{ textAlign: "center", color: colors.slate }}>
            No flights available for this route. Try another departure or arrival city.
          </p>
        )}

        {flights.map((flight) => (
          <div
            key={flight._id}
            style={{ ...styles.card, marginBottom: "16px", padding: "22px", display: "flex", alignItems: "center", gap: "20px" }}
          >
            <div style={{ flex: 1 }}>
              <h3 style={{ ...styles.h2, fontSize: "18px", color: colors.navy }}>{flight.airline}</h3>
              <p style={{ color: colors.slate, margin: "6px 0 0", fontFamily: fonts.mono, fontSize: "14px" }}>
                {flight.departureCity} → {flight.arrivalCity}
              </p>
              <p style={{ color: colors.slate, marginTop: "10px", fontSize: "13px", fontFamily: fonts.mono}}>
                Departure:{" "}{new Date(flight.departureTime).toLocaleString()}
              </p>
              <p style={{ color: colors.slate, fontSize: "13px", fontFamily: fonts.mono}}>
                Arrival:{" "}{new Date(flight.arrivalTime).toLocaleString()}
              </p>
            </div>

            <div style={{ width: "1px", alignSelf: "stretch" }}>
              <TicketDivider bg={colors.paper} />
            </div>

            <div style={{ textAlign: "right" }}>
              <p style={{ fontFamily: fonts.mono, fontSize: "20px", fontWeight: 600, color: colors.navy, margin: 0 }}>
                ${flight.price}
              </p>
              <button
                onClick={() => (window.location.href = `/booking/${flight._id}`)}
                style={{ ...styles.button, marginTop: "10px", padding: "9px 20px", fontSize: "13px" }}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* POPULAR DESTINATIONS */}
      <div style={{ padding: "40px 20px", background: colors.paper, borderTop: `1px solid ${colors.line}` }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h2 style={{ ...styles.h2, fontSize: "20px", color: colors.navy, marginBottom: "16px" }}>
            Popular Destinations
          </h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["Colombo → Dubai", "Colombo → Singapore", "Dubai → London"].map((route) => (
              <span
                key={route}
                style={{
                  fontFamily: fonts.mono,
                  fontSize: "13px",
                  color: colors.navy,
                  background: colors.cloud,
                  border: `1px solid ${colors.line}`,
                  borderRadius: "999px",
                  padding: "8px 16px"
                }}
              >
                {route}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;