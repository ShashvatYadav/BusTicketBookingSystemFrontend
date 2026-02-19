import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchBus = () => {
  const navigate = useNavigate();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    navigate(
      `/buses?source=${source}&destination=${destination}&date=${date}`
    );
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Search Bus</h2>

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
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleSearch}
          className="bg-green-600 text-white p-2 rounded"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBus;