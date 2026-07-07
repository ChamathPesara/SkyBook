import { useNavigate } from "react-router-dom";
import { colors,fonts } from "./Theme";
import Logo from "./Logo";

// Shared top bar for logged-in pages. Add it to any page the same way it's
// used in Home.js: import NavBar and render it as the first element.
function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 30px",
        background: colors.navyDeep
      }}
    >
      <div style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
        <Logo size={30} />
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          onClick={() => navigate("/my-bookings")}
          style={{
            background: "transparent",
            border: "1.5px solid rgba(255,255,255,0.4)",
            color: "#fff",
            borderRadius: "8px",
            padding: "8px 18px",
            fontFamily: fonts.display,
            fontWeight: 600,
            fontSize: "13px",
            cursor: "pointer"
          }}
        >
          My Bookings
        </button>

        <button
          onClick={handleLogout}
          style={{
            background: colors.amber,
            border: "none",
            color: colors.navyDeep,
            borderRadius: "8px",
            padding: "8px 18px",
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer"
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default NavBar;