import {PaymentElement,useStripe,useElements} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PaymentForm({ booking }) {

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!stripe || !elements) return;

    try {

      const { error, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          redirect: "if_required",
        });

      if (error) {
        alert(error.message);
        return;
      }

      const bookingData = {
        venue: booking.venueId,
        booking_date: booking.bookingDate,
        guest_count: booking.guestCount,
        time_slot: booking.timeSlot,
        total_amount: booking.amount,
      };

      const token = localStorage.getItem("access");

      console.log("TOKEN:", token);

      const bookingResponse = await axios.post(
        "http://127.0.0.1:8000/api/bookings/create/",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Booking Saved:", bookingResponse.data);

      await axios.post(
        "http://127.0.0.1:8000/api/payments/create/",
        {
          booking: bookingResponse.data.id,
          amount: booking.amount,
          transaction_id: paymentIntent.id,
          payment_status: "SUCCESS",
        }
      );
    navigate("/booking-success");

    } catch (error) {
      
      console.log("STATUS:", error.response?.status);
      console.log("ERROR:", error.response?.data);

      console.log(error);

      alert("Payment Failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Online Payment
        </h1>

        <div className="border rounded p-4 bg-gray-50">
          <PaymentElement />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 text-white p-3 rounded"
        >
          Pay Now
        </button>

      </form>

    </div>
  );
}

export default PaymentForm;