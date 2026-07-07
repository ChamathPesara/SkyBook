import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔥 NEW LANDING PAGE */}
        <Route path="/" element={<Landing />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* MAIN SYSTEM */}
        <Route path="/home" element={<Home />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/my-bookings" element={<MyBookings />}/>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
