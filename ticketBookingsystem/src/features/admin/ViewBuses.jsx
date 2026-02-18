import { useEffect, useState } from "react";
import api from "../../services/axiosInstance";

const ViewBuses = () => {

  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await api.get("/admin/buses");
        console.log(res.data)
        setBuses(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBuses();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6">All Buses</h2>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Bus Name</th>
            <th className="border p-2">Source</th>
            <th className="border p-2">Destination</th>
            <th className="border p-2">Total Seats</th>
          </tr>
        </thead>

        <tbody>
          {buses.map((bus) => (
            <tr key={bus.busId} className="text-center">
              <td className="border p-2">{bus.busId}</td>
              <td className="border p-2">{bus.busName}</td>
              <td className="border p-2">{bus.source}</td>
              <td className="border p-2">{bus.destination}</td>
              <td className="border p-2">{bus.totalSeat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBuses;