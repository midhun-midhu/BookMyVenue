
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Homepage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import VenueDetailsPage from "./pages/VenueDetailsPage";
import CheckoutPage from "./pages/checkoutpage";
import PaymentPage from "./pages/PaymentPage";
import BookingSuccessPage from "./pages/BookingSuccessPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import BookingDetailsPage from "./pages/BookingDetailsPage";

function App() {

  return (
    <Routes>

      <Route
        path="/"element={<HomePage />}
      />
      <Route
        path="/register"element={<RegisterPage />}
      />
      <Route
        path="/login"element={<LoginPage />}
      />
      <Route
        path="/venues/:id"element={<VenueDetailsPage />}
      />
      <Route
        path="/checkout"element={<CheckoutPage />}
      />
      <Route
        path="/payment"element={<PaymentPage />}
      />
      <Route
        path="/booking-success"element={<BookingSuccessPage />}
      />

      <Route
        path="/my-bookings"element={<MyBookingsPage />}
      />
      <Route
        path="/my-bookings/:id"element={<BookingDetailsPage />}
      />

    </Routes>
  );
}

export default App;