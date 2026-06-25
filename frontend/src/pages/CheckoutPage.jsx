import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {

  const location = useLocation();
  const booking = location.state;
  const navigate = useNavigate();

  if (!booking) {
    return <h1>No Booking Data Found</h1>;
  }

  const handlePayment = async () => {

    console.log("Button Clicked");
    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/bookings/create-payment-intent/",
        {
          amount: booking.amount,
        }
      );

      console.log(response.data);

        navigate("/payment", {
          state: booking
        });

    } catch (error) {

      console.log(error);

      alert("Payment Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-6">

        <div className="max-w-lg mx-auto border p-6 rounded-lg shadow">

          <h1 className="text-3xl font-bold mb-6 text-center">
            Checkout
          </h1>

          <p className="mb-3">
            <strong>Venue:</strong> {booking.venueName}
          </p>

          <p className="mb-3">
            <strong>Date:</strong> {booking.bookingDate}
          </p>

          <p className="mb-3">
            <strong>Time Slot:</strong> {booking.timeSlot}
          </p>

          <p className="mb-3">
            <strong>Guests:</strong> {booking.guestCount}
          </p>

          <p className="mb-3">
            <strong>Amount:</strong> ₹{booking.amount}
          </p>

          <button
            onClick={handlePayment}
            className="w-full bg-black text-white p-3 rounded mt-4"
          >
            conform
          </button>

        </div>

      </div>
    </>
  );
}

export default CheckoutPage;