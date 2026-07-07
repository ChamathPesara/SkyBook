import { colors, styles, GlobalFonts } from "./Theme";

// Reusable loading state for any page. Usage:
//   if (loading) return <LoadingScreen title="Loading your bookings…" subtitle="Please wait while we retrieve your trips." />;
//
// The animation reuses the dashed flight-path + amber plane motif from the
// Landing hero and the logo mark, so it reads as part of the same system
// instead of a generic spinner.
function LoadingScreen({ title = "Loading…", subtitle }) {
  return (
    <div style={{ ...styles.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <GlobalFonts />
      <style>{`
        @keyframes sb-fly {
          0%   { transform: translate(0px, 26px) rotate(-6deg); opacity: 0; }
          12%  { opacity: 1; }
          50%  { transform: translate(78px, -6px) rotate(0deg); }
          88%  { opacity: 1; }
          100% { transform: translate(156px, 22px) rotate(6deg); opacity: 0; }
        }
        @keyframes sb-dash {
          to { stroke-dashoffset: -22; }
        }
        @keyframes sb-dot {
          0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-3px); }
        }
        .sb-plane { animation: sb-fly 2.4s ease-in-out infinite; }
        .sb-track { animation: sb-dash 1s linear infinite; }
        .sb-dot { animation: sb-dot 1.4s ease-in-out infinite; }
      `}</style>

      <div style={{ textAlign: "center" }}>
        <div style={{ position: "relative", width: "170px", height: "56px", margin: "0 auto" }}>
          <svg width="170" height="56" viewBox="0 0 170 56" style={{ position: "absolute", top: 0, left: 0 }}>
            <path
              className="sb-track"
              d="M6,46 Q85,2 164,28"
              stroke={colors.line}
              strokeWidth="2"
              strokeDasharray="5 6"
              fill="none"
            />
          </svg>

          <svg
            className="sb-plane"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            style={{ position: "absolute", top: "14px", left: "-4px" }}
          >
            <path d="M2,13 L18,3 L12,19 L9,11 L2,13 Z" fill={colors.amber} />
            <path d="M9,11 L12,19 L10.4,14.6 L9,11 Z" fill={colors.amberDeep} />
          </svg>
        </div>

        <h2 style={{ ...styles.h2, fontSize: "20px", color: colors.navy, marginTop: "18px" }}>
          {title}
        </h2>

        {subtitle && (
          <p style={{ color: colors.slate, marginTop: "6px", fontSize: "14px" }}>{subtitle}</p>
        )}

        <div style={{ marginTop: "16px" }}>
          <span className="sb-dot" style={{ ...dot, animationDelay: "0s" }} />
          <span className="sb-dot" style={{ ...dot, animationDelay: "0.2s" }} />
          <span className="sb-dot" style={{ ...dot, animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
}

const dot = {
  display: "inline-block",
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: colors.amber,
  margin: "0 4px"
};

export default LoadingScreen;