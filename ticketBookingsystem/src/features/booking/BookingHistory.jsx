import { useEffect, useState } from "react";
import api from "../../services/axiosInstance";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/history");
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-2xl font-bold mb-6">
          My Bookings
        </h2>

        {bookings.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-600">
              You have no bookings yet.
            </p>
          </div>
        ) : (
          bookings.map((b) => (
            <div
              key={b.bookingId}
              className="bg-white p-6 rounded-xl shadow mb-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-sm text-gray-500">
                    Booking ID
                  </p>
                  <p className="font-semibold">
                    #{b.bookingId}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(
                    b.status
                  )}`}
                >
                  {b.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">

                <div>
                  <p className="text-sm text-gray-500">
                    Travel Date
                  </p>
                  <p className="font-medium">
                    {b.bookingDate}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Total Paid
                  </p>
                  <p className="font-semibold text-green-600">
                    ₹{b.totalPrice}
                  </p>
                </div>

              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Seats
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {b.seatNumbers.map((seat, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingHistory;