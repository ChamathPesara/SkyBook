import PDFDocument from "pdfkit";
import QRCode from "qrcode";

// Keep these in sync with the web app's theme.js
const COLORS = {
  navy: "#0B2545",
  amber: "#F2A93B",
  slate: "#5B6472",
  line: "#E1E7F0",
  cloud: "#F4F7FB",
  ink: "#161B22"
};

export const generateTicket = async (booking, res) => {
  const doc = new PDFDocument({ size: "A4", margin: 0 });

  // Set headers for download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=ticket-${booking._id}.pdf`
  );

  doc.pipe(res);

  // ---- Page background ----
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.cloud);

  doc
    .fillColor(COLORS.slate)
    .font("Helvetica")
    .fontSize(9)
    .text("SKYBOOK AIRLINES", 50, 40, { characterSpacing: 1 });

  // ---- Ticket card geometry ----
  const cardX = 50;
  const cardY = 80;
  const cardWidth = doc.page.width - 100;
  const cardHeight = 290;
  const headerHeight = 80;
  const dividerX = cardX + cardWidth * 0.7;

  // card base (fill + border in one path, so the stroke isn't lost)
  doc
    .lineWidth(1)
    .rect(cardX, cardY, cardWidth, cardHeight)
    .fillAndStroke("#FFFFFF", COLORS.line);

  // header band + amber accent line
  doc.rect(cardX, cardY, cardWidth, headerHeight).fill(COLORS.navy);
  doc.rect(cardX, cardY + headerHeight, cardWidth, 4).fill(COLORS.amber);

  doc
    .fillColor(COLORS.amber)
    .font("Helvetica-Bold")
    .fontSize(10)
    .text("SKYBOOK · E-TICKET", cardX + 30, cardY + 20, { characterSpacing: 1.2 });

  doc
    .fillColor("#FFFFFF")
    .font("Helvetica-Bold")
    .fontSize(22)
    .text(
      `${booking.flight.departureCity}  ->  ${booking.flight.arrivalCity}`,
      cardX + 30,
      cardY + 42,
      { width: dividerX - cardX - 60 }
    );

  // ---- Perforation divider with punched notches ----
  doc
    .dash(4, { space: 4 })
    .strokeColor(COLORS.line)
    .moveTo(dividerX, cardY)
    .lineTo(dividerX, cardY + cardHeight)
    .stroke()
    .undash();

  doc.circle(dividerX, cardY, 9).fill(COLORS.cloud);
  doc.circle(dividerX, cardY + cardHeight, 9).fill(COLORS.cloud);

  // ---- Main details (left of the perforation) ----
  const detailX = cardX + 30;
  const detailWidth = dividerX - detailX - 20;
  let detailY = cardY + headerHeight + 20;
  const rowGap = 34;

  const field = (label, value, mono = true) => {
    doc
      .fillColor(COLORS.slate)
      .font("Helvetica")
      .fontSize(8)
      .text(label.toUpperCase(), detailX, detailY, { characterSpacing: 1 });

    doc
      .fillColor(COLORS.ink)
      .font(mono ? "Courier-Bold" : "Helvetica-Bold")
      .fontSize(13)
      .text(String(value), detailX, detailY + 12, { width: detailWidth });

    detailY += rowGap;
  };

  // Try to render a friendlier date, but fall back to the raw value
  let dateDisplay = booking.flight.departureTime;
  const parsedDate = new Date(booking.flight.departureTime);
  if (!isNaN(parsedDate)) {
    dateDisplay = parsedDate.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  }

  field("Passenger", booking.passengerName, false);
  field("Flight", booking.flight.flightNumber);
  field("Date", dateDisplay, false);
  field("Booking ID", booking._id);

  // ---- Stub (right of the perforation) ----
  const stubX = dividerX + 30;
  const stubWidth = cardX + cardWidth - stubX - 20;

  doc
    .fillColor(COLORS.slate)
    .font("Helvetica")
    .fontSize(8)
    .text("SEAT", stubX, cardY + headerHeight + 20, { characterSpacing: 1 });

  doc
    .fillColor(COLORS.navy)
    .font("Courier-Bold")
    .fontSize(26)
    .text(booking.seatNumber, stubX, cardY + headerHeight + 32);

  // Generate QR Code
  const qrData = JSON.stringify({
    bookingId: booking._id,
    passenger: booking.passengerName,
    flight: booking.flight.flightNumber,
    seat: booking.seatNumber
  });

  const qrImage = await QRCode.toDataURL(qrData, { margin: 0 });
  const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");
  const imgBuffer = Buffer.from(base64Data, "base64");

  const qrSize = Math.min(stubWidth, 90);
  doc.image(imgBuffer, stubX, cardY + headerHeight + 80, {
    fit: [qrSize, qrSize]
  });

  // Footer note
  doc
    .fillColor(COLORS.slate)
    .font("Helvetica")
    .fontSize(8)
    .text(
      "Present this ticket and a valid photo ID at check-in.",
      cardX,
      cardY + cardHeight + 20,
      { width: cardWidth, align: "center" }
    );

  doc.end();
};