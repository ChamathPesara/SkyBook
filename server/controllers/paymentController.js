import Stripe from "stripe";
import Booking from "../models/Booking.js";

export const createPaymentSession = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId).populate("flight");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",

          metadata: {
            bookingId: booking._id.toString()
          },

          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: `Flight ${booking.flight.flightNumber}`
                },
                unit_amount: booking.flight.price * 100
              },
              quantity: 1
            }
          ],

          success_url: `http://localhost:3000/payment-success?bookingId=${booking._id}`,
          cancel_url: "http://localhost:3000/payment-cancel"
        });

        res.json({
            url: session.url
        });

  } catch (error) {
        res.status(500).json({ message: error.message });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.paymentStatus = "paid";
    booking.bookingStatus = "confirmed";

    await booking.save();

    res.json({ message: "Payment confirmed" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const webhookHandler = async (req, res) => {
  console.log("========== WEBHOOK RECEIVED ==========");
  console.log(req.headers["stripe-signature"]);
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  console.log(event.type);
  console.log(event.data.object.metadata);

  // ✅ handle successful payment
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const bookingId = session.metadata.bookingId;

    console.log("Booking ID from Stripe:", bookingId);

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      console.log("❌ Booking not found!");
      return res.json({ received: true });
    }

    console.log("Before update:");
    console.log({
      paymentStatus: booking.paymentStatus,
      bookingStatus: booking.bookingStatus
    });

    booking.paymentStatus = "paid";
    booking.bookingStatus = "confirmed";

    await booking.save();

    // Read it again from MongoDB
    const updatedBooking = await Booking.findById(bookingId);

    console.log("After update:");
    console.log({
      paymentStatus: updatedBooking.paymentStatus,
      bookingStatus: updatedBooking.bookingStatus
    });

    console.log("✅ Booking updated successfully");
  }
  res.json({ received: true });
};