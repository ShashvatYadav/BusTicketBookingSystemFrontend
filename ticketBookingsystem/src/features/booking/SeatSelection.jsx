import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../../services/axiosInstance";

const SeatSelection = () => {
  const { busId } = useParams();
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  const navigate = useNavigate();

  const [bus, setBus] = useState({ seats: [] });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const SEAT_PRICE = 500;

  useEffect(() => {
    if (!date) {
      setError("Booking date is missing.");
      setLoading(false);
      return;
    }

    const fetchBus = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/buses/${busId}?date=${date}`);
        console.log(res.data)
        setBus(res.data);
      } catch (err) {
        setError("Failed to load bus data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBus();
  }, [busId, date]);

  const toggleSeat = (seatId, isBooked) => {
    if (isBooked) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) return;
  
    navigate("/payment", {
      state: {
        busId: bus.busId,
        busName: bus.busName,
        seatIds: selectedSeats,
        bookingDate: date,
        totalPrice
      }
    });
  };

  const totalPrice = selectedSeats.length * SEAT_PRICE;

  if (loading) return <div className="text-center mt-6">Loading seats...</div>;
  if (error) return <div className="text-center text-red-600 mt-6">{error}</div>;
  if (!bus || !Array.isArray(bus.seats))
    return <div className="text-center mt-6">No seats available</div>;
  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-2">{bus.busName}</h2>
      <p className="text-gray-600 mb-4">Date: {date}</p>

      <div className="grid grid-cols-4 gap-4">
        {bus.seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.seatId);

          return (
            <button
              key={seat.seatId}
              disabled={seat.isBooked}
              onClick={() => toggleSeat(seat.seatId, seat.booked)}
              className={`p-2 rounded font-semibold transition ${seat.booked
                  ? "bg-red-500 text-white cursor-not-allowed"
                  : isSelected
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
            >
              {seat.seatNumber}
            </button>
          );
        })}
      </div>
      <div className="mt-6 border-t pt-4">
        <p className="mb-2">
          Selected Seats:{" "}
          {selectedSeats.length > 0
            ? selectedSeats.length
            : "None"}
        </p>
        <p className="mb-4 font-semibold">
          Total Price: ₹{totalPrice}
        </p>

        <button
          disabled={selectedSeats.length === 0}
          onClick={handleBooking}
          className={`px-6 py-2 rounded text-white ${selectedSeats.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;