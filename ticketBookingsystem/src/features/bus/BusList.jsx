import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/axiosInstance";

const BusList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);

  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");

  useEffect(() => {
    const fetchBuses = async () => {
      const res = await api.get(
        `/routes/search?source=${source}&destination=${destination}`
      );
      setBuses(res.data);
    };

    if (source && destination) fetchBuses();
  }, [source, destination]);

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-4">
      {buses.map((bus) => (
        <div
          key={bus.busId}
          className="border p-4 rounded shadow flex justify-between"
        >
          <div>
            <h3 className="font-semibold text-lg">
              {bus.busName}
            </h3>
            <p>Total Seats: {bus.totalSeat}</p>
          </div>

          <button
            onClick={() =>
              navigate(`/seat/${bus.busId}?date=${date}`)
            }
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Select Seats
          </button>
        </div>
      ))}
    </div>
  );
};

export default BusList;