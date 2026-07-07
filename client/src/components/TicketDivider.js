import { colors } from "./Theme";

// The signature element: a dashed perforation with two punched-out
// notches, exactly like the tear line on a real boarding pass. `bg` should
// match whatever surface the card sits on so the notches read as cutouts.
function TicketDivider({ bg = colors.paper }) {
  return (
    <div style={{ position: "relative", height: "1px", margin: "0 -1px" }}>
      <div
        style={{
          position: "absolute",
          left: "-11px",
          top: "-11px",
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: bg
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "-11px",
          top: "-11px",
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: bg
        }}
      />
      <div style={{ borderTop: `2px dashed ${colors.line}` }} />
    </div>
  );
}

export default TicketDivider;