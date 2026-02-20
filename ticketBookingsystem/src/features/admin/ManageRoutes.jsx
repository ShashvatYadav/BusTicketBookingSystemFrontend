import React, { useEffect, useState } from 'react'
import api from '../../services/axiosInstance'
import { Link } from 'react-router-dom';

const ManageRoutes = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await api.get("/admin/routes");
        console.log(res.data);
        setRoutes(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchRoutes();
  }, [])

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          All Routes
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="p-3">#</th>
                <th className="p-3">Source</th>
                <th className="p-3">Destination</th>
                <th className="p-3 text-center">Manage</th>
              </tr>
            </thead>

            <tbody>
              {routes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">
                    No routes available.
                  </td>
                </tr>
              ) : (
                routes.map((route, index) => (
                  <tr
                    key={route.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium">{route.id}</td>
                    <td className="p-3">{route.source}</td>
                    <td className="p-3">{route.destination}</td>
                    <td className="p-3 text-center">
                      <Link
                        to={`/admin/edit-route/${route.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition"
                      >
                        Edit Route
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  )
}

export default ManageRoutes