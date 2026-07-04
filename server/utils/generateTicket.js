import PDFDocument from "pdfkit";
import QRCode from "qrcode";

export const generateTicket = async (booking, res) => {
  const doc = new PDFDocument();

  // Set headers for download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=ticket-${booking._id}.pdf`
  );

  doc.pipe(res);

  // Title
  doc.fontSize(20).text("E-Ticket", { align: "center" });
  doc.moveDown();

  // Booking details
  doc.fontSize(12).text(`Passenger: ${booking.passengerName}`);
  doc.text(`Flight: ${booking.flight.flightNumber}`);
  doc.text(
    `Route: ${booking.flight.departureCity} >>> ${booking.flight.arrivalCity}`
  );
  doc.text(`Seat: ${booking.seatNumber}`);
  doc.text(`Date: ${booking.flight.departureTime}`);
  doc.text(`Booking ID: ${booking._id}`);

  doc.moveDown();

  // Generate QR Code
  const qrData = JSON.stringify({
    bookingId: booking._id,
    passenger: booking.passengerName,
    flight: booking.flight.flightNumber,
    seat: booking.seatNumber
  });

  const qrImage = await QRCode.toDataURL(qrData);

  const base64Data = qrImage.replace(/^data:image\/png;base64,/, "");
  const imgBuffer = Buffer.from(base64Data, "base64");

  doc.image(imgBuffer, {
    fit: [150, 150],
    align: "center"
  });

  doc.end();
};