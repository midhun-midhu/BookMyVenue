import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function MyBookingsPage() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const fetchBookings = async () => {

      try {


      const token = localStorage.getItem("access");

      console.log("TOKEN:", token);

      const response = await axios.get(
        "http://127.0.0.1:8000/api/bookings/get-bookings/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        
        console.log(response.data);

        setBookings(response.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchBookings();

  }, []);

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          My Bookings
        </h1>

        {bookings.map((booking) => (

          <div
            key={booking.id}
            className="border p-4 rounded mb-4 shadow"
          >
            
            <img
              src={`http://127.0.0.1:8000${booking.venue_image}`}
              alt={booking.venue_name}
              className="w-full h-40 object-cover rounded"
            />
            <h2>{booking.venue_name}</h2>

            <p>{booking.venue_location}</p>

            <p>{booking.booking_date}</p>

            <p>{booking.time_slot_name}</p>

            <p> Guests: {booking.guest_count}</p>

            <p>Amount Paid: ₹{booking.total_amount}</p>

            <p>{booking.status}</p>

            <Link
              to={`/my-bookings/${booking.id}`}
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Details
            </Link>

          </div>

        ))}
      </div>
    </>
  );
}

export default MyBookingsPage;