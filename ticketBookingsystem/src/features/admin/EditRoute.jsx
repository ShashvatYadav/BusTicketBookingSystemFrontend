import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/axiosInstance'

const EditRoute = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [routeData, setRouteData] = useState({
    source: "",
    destination: ""
  })

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await api.get(`/admin/route/${id}`)
        setRouteData(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    if (id) {
      fetchRoute()
    }
  }, [id])

  const handleChange = (e) => {
    setRouteData({
      ...routeData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.put(`/admin/routes/${id}`, routeData)
      navigate("/admin/routes")
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Route
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Source
            </label>
            <input
              type="text"
              name="source"
              value={routeData.source}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2 font-medium">
              Destination
            </label>
            <input
              type="text"
              name="destination"
              value={routeData.destination}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/routes")}
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {loading ? "Updating..." : "Update Route"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditRoute