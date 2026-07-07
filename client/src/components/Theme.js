// SkyBook design tokens.
// Visual idea: the boarding pass — a dashed perforation with punched
// notches separates the "airline stub" from the "passenger stub" on every
// real ticket. That divider (see TicketDivider.js) is reused across the
// flight results, booking summary, payment and confirmation screens so the
// whole app reads like a set of tickets rather than a generic admin UI.

export const colors = {
  navy: "#0B2545",       // primary — fuselage / night-sky navy
  navyDeep: "#081B36",   // gradient partner for hero sections
  sky: "#3FA9F5",        // accent — daytime sky, used sparingly for links/focus
  amber: "#F2A93B",      // ticket-stub gold — primary call-to-action color
  amberDeep: "#D6900F",  // hover/active state for amber
  cloud: "#F4F7FB",      // page background
  paper: "#FFFFFF",      // card background
  ink: "#161B22",         // primary text
  slate: "#5B6472",       // secondary text
  line: "#E1E7F0",        // borders / dashed dividers
  success: "#1E8E5A",
  successBg: "#E8F7EF",
  danger: "#C1442D",
  dangerBg: "#FBEAE6",
  booked: "#CBD1DA"
};

export const fonts = {
  display: "'Space Grotesk', 'Segoe UI', sans-serif", // headlines, buttons
  body: "'Inter', 'Segoe UI', sans-serif",             // paragraphs, inputs
  mono: "'IBM Plex Mono', 'Courier New', monospace"    // flight codes, PNRs, seats
};

// Renders once per page to pull in the three type families.
export function GlobalFonts() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');
    `}</style>
  );
}

export const styles = {
  page: {
    minHeight: "100vh",
    background: colors.cloud,
    fontFamily: fonts.body,
    color: colors.ink
  },
  eyebrow: {
    fontFamily: fonts.mono,
    fontSize: "12px",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: colors.sky,
    fontWeight: 600
  },
  h1: {
    fontFamily: fonts.display,
    fontWeight: 700,
    margin: 0
  },
  h2: {
    fontFamily: fonts.display,
    fontWeight: 600,
    margin: 0
  },
  card: {
    background: colors.paper,
    borderRadius: "16px",
    border: `1px solid ${colors.line}`,
    boxShadow: "0 4px 20px rgba(11,37,69,0.06)"
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: `1px solid ${colors.line}`,
    fontFamily: fonts.body,
    fontSize: "15px",
    color: colors.ink,
    outline: "none",
    boxSizing: "border-box",
    background: "#fff"
  },
  label: {
    fontFamily: fonts.body,
    fontSize: "13px",
    fontWeight: 600,
    color: colors.slate,
    marginBottom: "6px",
    display: "block"
  },
  button: {
    background: colors.amber,
    color: colors.navyDeep,
    border: "none",
    borderRadius: "8px",
    padding: "13px 28px",
    fontFamily: fonts.display,
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
    letterSpacing: "0.2px"
  },
  buttonDisabled: {
    background: colors.booked,
    color: "#8890A0",
    border: "none",
    borderRadius: "8px",
    padding: "13px 28px",
    fontFamily: fonts.display,
    fontWeight: 700,
    fontSize: "15px",
    cursor: "not-allowed",
    letterSpacing: "0.2px"
  },
  buttonGhost: {
    background: "transparent",
    color: "#fff",
    border: "1.5px solid rgba(255,255,255,0.6)",
    borderRadius: "8px",
    padding: "11px 26px",
    fontFamily: fonts.display,
    fontWeight: 600,
    fontSize: "15px",
    cursor: "pointer"
  },
  mono: {
    fontFamily: fonts.mono
  }
};