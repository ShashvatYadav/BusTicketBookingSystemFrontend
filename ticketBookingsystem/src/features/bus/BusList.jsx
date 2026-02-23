import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/axiosInstance";

const BusList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `/routes/search?source=${source}&destination=${destination}`
        );
        setBuses(res.data);
      } catch (err) {
        console.error("Failed to fetch buses");
      } finally {
        setLoading(false);
      }
    };

    if (source && destination) fetchBuses();
  }, [source, destination]);

  const handleToggleRoute = () => {
    setSearchParams({
      source: destination,
      destination: source,
      date: date,
    });
  };

  if (loading)
    return <div className="text-center mt-10 text-lg">Loading buses...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-6">

      {/* Route Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {source} → {destination}
        </h2>

        <button
          onClick={handleToggleRoute}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          🔄 Switch
        </button>
      </div>

      {buses.length === 0 ? (
        <div className="text-center text-xl text-red-500">
          Sorry! No Bus Found
        </div>
      ) : (
        <div className="space-y-4">
          {buses.map((bus) => (
            <div
              key={bus.busId}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {bus.busName}
                </h3>
                <p className="text-gray-600">
                  Travel Date: {date}
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(`/seat/${bus.busId}?date=${date}`)
                }
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Select Seats
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusList;