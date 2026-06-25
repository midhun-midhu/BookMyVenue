import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51RxP9KEWePVhyBTCUvvp0QViBE1T8te0vbPcUFdLwTmh3dnsCe5d7A0wC0bIyOgYnVyYo9R6Af3ncqhhhmTqnAWa00FqiQhUBu"
);

function PaymentPage() {

  const location = useLocation();

  const booking = location.state;

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {

    const getClientSecret = async () => {

      try {

        const response = await axios.post(
          "http://127.0.0.1:8000/api/bookings/create-payment-intent/",
          {
            amount: booking.amount,
          }
        );

        console.log(response.data);

        setClientSecret(
          response.data.client_secret
        );

      } catch (error) {

        console.log(error);
      }
    };

    if (booking) {
      getClientSecret();
    }

  }, [booking]);

  if (!booking) {
    return <h1>No Booking Data Found</h1>;
  }

  return (

    clientSecret ? (

      <Elements stripe={stripePromise}options={{clientSecret,}}>
        <PaymentForm booking={booking} />
      </Elements>

    ) : (

      <h1>Loading Payment...</h1>

    )

  );
}

export default PaymentPage;