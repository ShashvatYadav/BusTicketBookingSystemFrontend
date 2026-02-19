import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../../services/axiosInstance";

const SeatSelection = () => {
  const { busId } = useParams();
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");

  const [bus, setBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchBus = async () => {
      const res = await api.get(
        `/buses/${busId}?date=${date}`
      );
      setBus(res.data);
    };

    fetchBus();
  }, [busId, date]);

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(
        selectedSeats.filter((id) => id !== seatId)
      );
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = async () => {
    try {
      const res = await api.post("/bookings", {
        busId: bus.busId,
        seatIds: selectedSeats,
        bookingDate: date,
      });

      alert("Booking Successful!");
      console.log(res.data);
    } catch (err) {
      alert("Booking failed");
      console.log(err);
    }
  };

  if (!bus) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">
        Select Seats
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {bus.seats.map((seat) => (
          <button
            key={seat.seatId}
            disabled={seat.isBooked}
            onClick={() => toggleSeat(seat.seatId)}
            className={`p-2 rounded ${
              seat.isBooked
                ? "bg-red-500"
                : selectedSeats.includes(seat.seatId)
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>

      <button
        disabled={selectedSeats.length === 0}
        onClick={handleBooking}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default SeatSelection;