import { colors, fonts } from "./Theme";

// Single source of truth for the brand name. Change this one line to
// rename the system everywhere Logo is used (NavBar, Landing, etc).
export const brandName = "SkyBook";
export const brandTagline = "Airlines";

// The icon mark: a navy badge, amber paper plane, dashed flight-path arc.
// To swap in a different mark entirely, replace the two <path> shapes
// below (or swap this whole function for an <img src="/logo.svg" .../>
// if you'd rather use a designed asset file instead of inline SVG).
export function LogoMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill={colors.navy} />
      <path
        d="M9 31 Q24 12 39 19"
        stroke={colors.amber}
        strokeWidth="1.4"
        strokeDasharray="3 3"
        fill="none"
        opacity="0.55"
      />
      <path d="M14 27 L34 13 L26.5 34 L23 24.5 L14 27 Z" fill={colors.amber} />
      <path d="M23 24.5 L26.5 34 L24.3 27.6 L23 24.5 Z" fill={colors.amberDeep} />
    </svg>
  );
}

// Full lockup used in the nav bar and hero. Pass dark={true} when placing
// it on a light background (the wordmark defaults to white, for use on
// the navy nav bar / hero).
function Logo({ size = 36, showWordmark = true, dark = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <LogoMark size={size} />
      {showWordmark && (
        <span
          style={{
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: size * 0.5,
            color: dark ? colors.navy : "#fff",
            letterSpacing: "0.2px"
          }}
        >
          {brandName}
        </span>
      )}
    </div>
  );
}

export default Logo;