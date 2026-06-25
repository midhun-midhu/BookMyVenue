import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function BookingSuccessPage() {

  const navigate = useNavigate();

  useEffect(() => {

  const timer = setTimeout(() => {
    navigate("/my-bookings");
  }, 5000);

  return () => clearTimeout(timer);

}, []);

  return (
    <div className="text-center mt-20">

      <h1 className="text-4xl font-bold">
        Payment Successful
      </h1>

      <p className="mt-4">
        Your booking has been confirmed.
      </p>

      <button
        onClick={() => navigate("/my-bookings")}
        className="bg-black text-white px-6 py-3 rounded mt-6"
      >
        My Bookings
      </button>

    </div>
  );
}

export default BookingSuccessPage;