import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function VenueDetailsPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [venue, setVenue] = useState(null);

const [bookingData, setBookingData] = useState({
  booking_date: "",
  guest_count: "",
  time_slot: "",
});

const handleChange = (e) => {
  setBookingData({
    ...bookingData,
    [e.target.name]: e.target.value,
  });
};

const handleBooking = () => {

  const token = localStorage.getItem("access");

  if (!token) {
    alert("Please login or register first");
    navigate("/login");
    return;
  }

  if (!venue) {
  alert("Venue not loaded");
  return;
  }

  if (
    !bookingData.booking_date ||
    !bookingData.guest_count ||
    !bookingData.time_slot
  ) {
    alert("Please fill all fields");
    return;
  }

  console.log("Booking Data:", bookingData);
  
  navigate("/checkout", {
    state: {
      venueId: venue.id,
      venueName: venue.name,
      bookingDate: bookingData.booking_date,
      guestCount: bookingData.guest_count,
      timeSlot: bookingData.time_slot,
      amount: venue.price,
    },
  });
};


useEffect(() => {

  const fetchVenue = async () => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/venues/${id}/`
      );

      console.log(response.data);

      setVenue(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  fetchVenue();

}, [id]);

  if (!venue) {
    return <div>Loading...</div>;
  }



  return (
<>
    <Navbar />

    <div className="container mx-auto px-6 py-10">

      {/* Venue Image */}
      <img
        src="https://placehold.co/1200x500"
        alt={venue.name}
        className="w-full h-[450px] object-cover rounded-lg"
      />

      {/* Venue Info */}
      <div className="mt-8">

        <h1 className="text-4xl font-bold">
          {venue.name}
        </h1>

        <p className="text-gray-600 mt-2">
          📍 {venue.location}
        </p>

        <div className="flex gap-8 mt-4">
          <p className="font-semibold">
            👥 Capacity: {venue.capacity}
          </p>

          <p className="font-semibold">
            💰 ₹{venue.price}/day
          </p>
        </div>

      </div>

      {/* Description */}
      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-3">
          About the Venue
        </h2>

        <p className="text-gray-700 leading-7">
          {venue.description}
        </p>

      </div>

{/* Booking Form */}
<div className="mt-10 max-w-md border p-6 rounded-lg shadow">

  <h2 className="text-2xl font-bold mb-4">
    Book This Venue
  </h2>

  <input
    type="date"
    name="booking_date"
    value={bookingData.booking_date}
    onChange={handleChange}
    className="w-full border p-3 rounded mb-4"
  />

<select
  name="time_slot"
  value={bookingData.time_slot}
  onChange={handleChange}
  className="w-full border p-3 rounded mb-4"
>
  <option value="">Select Time Slot</option>
  <option value="1">Morning</option>
  <option value="2">Afternoon</option>
  <option value="3">Evening</option>
  <option value="4">Night</option>
</select>

  <input
    type="number"
    name="guest_count"
    placeholder="Number of Guests"
    value={bookingData.guest_count}
    onChange={handleChange}
    className="w-full border p-3 rounded mb-4"
  />

  <button
    onClick={handleBooking}
    className="w-full bg-black text-white p-3 rounded"
  >
    Book Now
  </button>

</div>





    </div>
  </>
  );
}

export default VenueDetailsPage;