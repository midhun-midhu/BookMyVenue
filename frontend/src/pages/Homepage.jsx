import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {

    const [venues, setVenues] = useState([]);

    useEffect(() => {

  const fetchVenues = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/venues/"
      );

      setVenues(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  fetchVenues();

}, []);


  return (
    <>
      <Navbar />

      <div className="container mx-auto px-6">

        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-5xl font-bold">
            Find Your Perfect Venue
          </h1>

          <p className="mt-4 text-gray-600">
            Book halls, auditoriums, wedding venues and more.
          </p>

          <input
            type="text"
            placeholder="Search venues..."
            className="border p-3 mt-6 w-full max-w-md rounded"
          />
        </section>

        {/* Featured Venues */}
        <section>
          <h2 className="text-3xl font-bold mb-8">
            Featured Venues
          </h2>

            <div className="grid md:grid-cols-3 gap-6">

              {venues.map((venue) => (

              <div
                  key={venue.id}
                  className="border rounded p-4 shadow"
                  >

                  <img
                      src="https://placehold.co/400x250"
                      alt={venue.name}
                      className="rounded"
                  />

                  <h3 className="text-xl font-semibold mt-3">
                      {venue.name}
                  </h3>

                  <p className="text-gray-600">
                      {venue.location}
                  </p>

                  <p className="mt-2">
                      ₹{venue.price}
                  </p>

                  <Link
                      to={`/venues/${venue.id}`}
                      className="bg-black text-white px-4 py-2 mt-4 rounded inline-block"
                  >
                      View Details
                  </Link>

              </div>

              ))}

            </div>
            
        </section>

      </div>
    </>
  );
}

export default HomePage;