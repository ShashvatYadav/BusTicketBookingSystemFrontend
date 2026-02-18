import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="max-w-5xl mx-auto mt-8 space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">

        <Link
          to="/admin/add-bus"
          className="bg-blue-600 text-white p-6 rounded shadow text-center"
        >
          Add Bus
        </Link>

        <Link
          to="/admin/buses"
          className="bg-green-600 text-white p-6 rounded shadow text-center"
        >
          View Buses
        </Link>

        <Link
          to="/admin/routes"
          className="bg-purple-600 text-white p-6 rounded shadow text-center"
        >
          View Routes
        </Link>

      </div>
    </div>
  );
};

export default AdminDashboard;