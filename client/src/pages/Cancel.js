import { colors, fonts, styles, GlobalFonts } from "../components/Theme";

function Cancel() {
  return (
    <div
      style={{
        ...styles.page,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px"
      }}
    >
      <GlobalFonts />

      <div style={{ ...styles.card, padding: "40px", textAlign: "center", maxWidth: "420px" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: colors.dangerBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "24px",
            color: colors.danger
          }}
        >
          ✕
        </div>
        <h2 style={{ ...styles.h2, fontSize: "22px", color: colors.navy }}>Payment Cancelled</h2>
        <p style={{ color: colors.slate, marginTop: "8px", fontFamily: fonts.body }}>
          No charge was made. You can try again anytime from your bookings.
        </p>
      </div>
    </div>
  );
}

export default Cancel;