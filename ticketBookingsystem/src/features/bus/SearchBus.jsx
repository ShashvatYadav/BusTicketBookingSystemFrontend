import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchBus = () => {
  const navigate = useNavigate();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = () => {
    if (!source || !destination || !date) return;

    navigate(
      `/buses?source=${source}&destination=${destination}&date=${date}`
    );
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Search Bus</h2>

      <div className="grid gap-4">
        <input
          placeholder="From"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="To"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          disabled={!source || !destination || !date}
          onClick={handleSearch}
          className={`p-2 rounded text-white ${
            !source || !destination || !date
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBus;