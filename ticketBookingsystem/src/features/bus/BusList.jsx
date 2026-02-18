import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../../services/axiosInstance';

const BusList = () => {
  const [searchParam] = useSearchParams();
  const [buses, setBuses] = useState([]);

  const source = searchParam.get("source");
  const destination = searchParam.get("destination");

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await api.get(
          `/routes/search?source=${source}&destination=${destination}`
        );
        setBuses(res.data);
      } catch (err) {
        console.log(err);
      }

    }
    if (source && destination) fetchBuses();
  }, [source, destination])

  return (
      <div className="max-w-4xl mx-auto mt-6 space-y-4">
        {buses.length === 0 ? (
          <p>No buses found.</p>
        ) : (
          buses.map((bus) => {
            const availableSeats = bus.seats.filter(
              seat => !seat.isBooked
            ).length;
    
            return (
              <div
                key={bus.busId}
                className="border p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {bus.busName}
                  </h3>
                  <p>Total Seats: {bus.totalSeat}</p>
                  <p>Available Seats: {availableSeats}</p>
                </div>
    
                <button className="bg-green-600 text-white px-4 py-2 rounded">
                  Select Seats
                </button>
              </div>
            );
          })
        )}
      </div>
    );
}

export default BusList