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
│       ├── components/       # NavBar, Logo, TicketDivider, LoadingScreen, Theme
│       ├── pages/             # Landing, Login, Register, Home, Booking,
│       │                      # Payment, PaymentSuccess, MyBookings, Cancel
│       └── services/           # Axios API instance
│
├── server/
│   ├── controllers/           # auth, flights, bookings, payments, tickets
│   ├── models/                 # User, Flight, Booking
│   ├── routes/
│   ├── middleware/             # JWT auth guard
│   └── utils/                  # generateTicket.js (PDF + QR)
│
└── README.md
```
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

- Landing Page
<img width="959" height="500" alt="Screenshot 2026-07-08 085830" src="https://github.com/user-attachments/assets/a5fabfbe-326d-489f-977f-552a8b8a8b68" />

- Sign Up Page
  <img width="958" height="499" alt="Screenshot 2026-07-08 080434" src="https://github.com/user-attachments/assets/4f5033e6-f665-4551-b45e-7a3636b79ed2" />

- Sign In Page
  <img width="959" height="500" alt="Screenshot 2026-07-08 080528" src="https://github.com/user-attachments/assets/1d9bf3ff-604a-4017-8724-3d779692b8e8" />

- Home Page
  <img width="955" height="500" alt="Screenshot 2026-07-08 080605" src="https://github.com/user-attachments/assets/026e99ee-0570-4322-b18d-f1d87920aaeb" />

- Available Flights 
<img width="959" height="499" alt="Screenshot 2026-07-08 084848" src="https://github.com/user-attachments/assets/d07340b6-a735-4bd4-8fd0-87d396bde92a" />

- Booking Page
<img width="959" height="497" alt="Screenshot 2026-07-08 084957" src="https://github.com/user-attachments/assets/9c178688-19dd-461d-a694-8b3927f4327e" />

- Payment Page
<img width="959" height="500" alt="Screenshot 2026-07-08 085020" src="https://github.com/user-attachments/assets/44a1ecca-88c4-4077-ba85-8f009ff1ad6d" />

- Stripe Sandbox
<img width="956" height="499" alt="Screenshot 2026-07-08 085131" src="https://github.com/user-attachments/assets/9181292c-0cf7-4cba-b93b-e26c06119741" />

- Payment Success Page
<img width="959" height="500" alt="Screenshot 2026-07-08 085211" src="https://github.com/user-attachments/assets/2e31e151-0efd-48db-a568-6682ea1b6037" />

- My Bookings Page
<img width="959" height="500" alt="Screenshot 2026-07-08 085339" src="https://github.com/user-attachments/assets/4d4889ed-c7e0-49f2-81c4-61400946e2a4" />

- Issued E-Ticket
<img width="959" height="499" alt="Screenshot 2026-07-08 085252" src="https://github.com/user-attachments/assets/2519b495-dcc6-468d-8149-6809e6244ef4" />

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

Share your great ✈️ with us !!!

</div>
