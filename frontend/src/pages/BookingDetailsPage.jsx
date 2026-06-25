import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function BookingDetailsPage() {

    const { id } = useParams();

    const [booking, setBooking] = useState(null);

    useEffect(() => {

        const fetchBooking = async () => {

            try {

                const token = localStorage.getItem("access");

                const response = await axios.get(
                    `http://127.0.0.1:8000/api/bookings/details/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log(response.data);

                setBooking(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchBooking();

    }, [id]);

    if (!booking) {
        return (
            <>
                <Navbar />
                <h1 className="text-center text-2xl mt-10">
                    Loading...
                </h1>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100">

                <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden">

                    <img
                        src={`http://127.0.0.1:8000${booking.venue_image}`}
                        alt={booking.venue_name}
                        className="w-full h-72 object-cover"
                    />

                    <div className="p-8">

                        <h1 className="text-3xl font-bold mb-6">
                            {booking.venue_name}
                        </h1>

                        <div className="space-y-4">

                            <p>
                                <strong>📍 Location:</strong>{" "}
                                {booking.venue_location}
                            </p>

                            <p>
                                <strong>📅 Booking Date:</strong>{" "}
                                {booking.booking_date}
                            </p>

                            <p>
                                <strong>🕒 Time Slot:</strong>{" "}
                                {booking.time_slot_name}
                            </p>

                            <p>
                                <strong>👥 Guests:</strong>{" "}
                                {booking.guest_count}
                            </p>

                            <p>
                                <strong>💰 Total Amount:</strong>{" "}
                                ₹{booking.total_amount}
                            </p>

                            <p>
                                <strong>📌 Status:</strong>{" "}
                                {booking.status}
                            </p>

                            <p>
                                <strong>💳 Payment:</strong> Paid
                            </p>

                            <p>
                                <strong>🆔 Booking ID:</strong>{" "}
                                #{booking.id}
                            </p>

                        </div>

                        <div className="flex gap-4 mt-8">

                            <button className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700">
                                Cancel Booking
                            </button>

                            <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700">
                                Download Invoice
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default BookingDetailsPage;