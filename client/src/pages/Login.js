import { useState } from "react";
import API from "../services/api";
import { colors, fonts, styles, GlobalFonts } from "../components/Theme";
import TicketDivider from "../components/TicketDivider";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("userInfo", JSON.stringify(data));
      window.location.href = "/home";
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div
      style={{
        ...styles.page,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px"
      }}
    >
      <GlobalFonts />

      <div style={{ ...styles.card, width: "100%", maxWidth: "400px", padding: "36px" }}>
        <div style={styles.eyebrow}>SKYBOOK · SIGN IN</div>
        <h2 style={{ ...styles.h2, fontSize: "26px", marginTop: "8px", color: colors.navy }}>
          Welcome back
        </h2>
        <p style={{ color: colors.slate, fontSize: "14px", marginTop: "6px" }}>
          Log in to manage your bookings
        </p>

        <div style={{ margin: "22px 0" }}>
          <TicketDivider bg={colors.paper} />
        </div>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            placeholder="you@example.com"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <div style={{ height: "16px" }} />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            placeholder="••••••••"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button type="submit" style={{ ...styles.button, width: "100%", marginTop: "24px" }}>
            Log In
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "13px", color: colors.slate, marginTop: "20px" }}>
          New to SkyBook? <a href="/register" style={{ color: colors.sky, fontFamily: fonts.body }}>Create an account</a>
        </p>
      </div>
    </div>
  );
}

export default Login;