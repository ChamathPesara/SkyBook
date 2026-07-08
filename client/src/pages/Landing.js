import { useNavigate } from "react-router-dom";
import { colors, fonts, styles, GlobalFonts } from "../components/Theme";
import { LogoMark, brandName, brandTagline } from "../components/Logo";

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(160deg, ${colors.navy} 0%, ${colors.navyDeep} 100%)`,
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: fonts.body
      }}
    >
      <GlobalFonts />

      {/* subtle flight-path arc in the background */}
      <svg
        width="900"
        height="900"
        viewBox="0 0 900 900"
        style={{ position: "absolute", top: "-250px", right: "-300px", opacity: 0.12 }}
      >
        <path
          d="M50,700 Q450,50 850,400"
          stroke={colors.sky}
          strokeWidth="2"
          strokeDasharray="8 10"
          fill="none"
        />
      </svg>

      <div style={{ marginBottom: "6px" }}>
        <LogoMark size={64} />
      </div>

      <div style={styles.eyebrow}>BOARDING · WORLDWIDE</div>

      <h1
        style={{
          ...styles.h1,
          fontSize: "48px",
          marginTop: "14px",
          marginBottom: "10px",
          letterSpacing: "0.5px"
        }}
      >
        {brandName} {brandTagline}
      </h1>

      <p style={{ marginBottom: "44px", color: "rgba(255,255,255,0.75)", fontSize: "16px" }}>
        Book flights easily, securely, and instantly
      </p>

      <div style={{ display: "flex", gap: "14px" }}>
        <button onClick={() => navigate("/login")} style={styles.button}>
          Log In
        </button>

        <button onClick={() => navigate("/register")} style={styles.buttonGhost}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Landing;