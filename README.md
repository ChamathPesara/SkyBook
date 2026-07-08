<div align="center">

# ✈️ SkyBook
### A Full-Stack Flight Reservation System

**Search flights. Pick a seat. Pay securely. Board with a QR-verified e-ticket — all in one flow.**

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black&style=flat-square)
![Node](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white&style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white&style=flat-square)
![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF?logo=stripe&logoColor=white&style=flat-square)
![JWT](https://img.shields.io/badge/Auth-JWT-black?logo=jsonwebtokens&style=flat-square)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Design System](#-design-system)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#️-installation)
- [Environment Variables](#-environment-variables)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)

---

## 📌 Overview

**SkyBook** is a full-stack flight booking platform built on the MERN stack, covering the complete passenger journey end to end:

> **Search → Select a seat → Pay with Stripe → Download a QR-verified PDF ticket.**

It's built as a realistic, production-shaped booking system rather than a toy CRUD app — real seat-map contention, webhook-verified payments, and downloadable e-tickets with scannable QR codes for check-in validation.

---

## 🚀 Features

#### 👤 User Management
- Registration & login with hashed credentials
- JWT-based authentication
- Protected routes on both client and API

#### 🔎 Flight Search
- Search by departure city, arrival city, and date
- Live results with pricing and airline details
- Per-flight detail view

#### 🎟️ Booking System
- Interactive seat map with live seat-availability state
- Passenger detail capture (name, passport number)
- Full booking history per user

#### 💳 Payment Integration
- Stripe Checkout session per booking
- Webhook-verified payment confirmation (not just client-side redirect trust)
- Cancel/failure handling

#### 🧾 Ticket Generation
- Server-generated PDF e-ticket per booking (via PDFKit)
- Embedded QR code encoding booking ID, passenger, flight, and seat for check-in scanning
- One-click ticket download from the confirmation and bookings pages

---

## 🎨 Design System

The UI follows a single visual idea: **it should look like a boarding pass, not an admin panel.**

- **Palette:** deep navy (`#0B2545`) + boarding-pass amber (`#F2A93B`)
- **Type:** Space Grotesk for headings, Inter for body copy, IBM Plex Mono for flight codes, seat numbers, and booking IDs
- **Signature element:** a dashed perforation with punched notch cutouts — reused across flight results, booking summaries, payment, and confirmation screens
- **Motion:** an amber paper plane flying a dashed flight path powers the loading states

Shared tokens live in `src/styles/theme.js`; the ticket-stub divider lives in `src/components/TicketDivider.js`.

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React.js, React Router, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Auth & Security** | JWT, protected/guarded API routes |
| **Payments** | Stripe Checkout + Webhooks |
| **Ticketing** | PDFKit, `qrcode` |

---

## 📂 Project Structure

```
skybook/
├── client/
│   └── src/
│       ├── components/       # NavBar, Logo, TicketDivider, LoadingScreen,Theme 
│       ├── pages/            # Landing, Login, Register, Home, Booking,
│       └──                   # Payment, PaymentSuccess, MyBookings, Cancel
│       
│
├── server/
│   ├── controllers/           # auth, flights, bookings, payments, tickets
│   ├── models/                 # User, Flight, Booking
│   ├── routes/
│   ├── middleware/             # JWT auth guard
│   └── utils/                  # generateTicket.js (PDF + QR)
│
└── README.md


---

## ⚙️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/skybook.git
cd skybook

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install

# 4. Set up environment variables (see below) in /server/.env

# 5. Run the backend
cd ../server
npm run dev

# 6. Run the frontend
cd ../client
npm start
```

The client runs on `http://localhost:3000` and the API on `http://localhost:5000` by default.

---

## 🔐 Environment Variables

Create a `.env` file inside `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

CLIENT_URL=http://localhost:3000
```

---

## 📸 Screenshots



---

## 🔮 Future Improvements

- [ ] Multi-city and round-trip search
- [ ] Admin dashboard for managing flights and viewing bookings
- [ ] Email delivery of e-tickets on successful payment
- [ ] Seat-hold locking to prevent double-booking under concurrent requests
- [ ] Booking cancellation & refund flow
- [ ] Real-time seat map updates via WebSockets

---

<div align="center">

Enjoy the ✈️ experience with us !!!

</div>
