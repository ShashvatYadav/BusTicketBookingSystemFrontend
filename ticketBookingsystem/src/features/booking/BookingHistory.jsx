import { useEffect, useState } from "react";
import api from "../../services/axiosInstance";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await api.get("/bookings/my");
      setBookings(res.data);
    };

    fetchBookings();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">
        My Bookings
      </h2>

      {bookings.map((b) => (
        <div
          key={b.bookingId}
          className="border p-4 rounded shadow mb-3"
        >
          <p>Status: {b.status}</p>
          <p>Total: ₹{b.totalAmount}</p>
        </div>
      ))}
    </div>
  );
};

export default BookingHistory;