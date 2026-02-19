import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import SearchBus from "../features/bus/SearchBus";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import SeatSelection from "../features/booking/SeatSelection";
import BusList from "../features/bus/BusList";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../features/admin/AdminBashboard";
import AddBus from "../features/admin/AddBus";
import ViewBuses from "../features/admin/ViewBuses";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { index: true, element: <SearchBus /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
  
        { path: "buses", element: <BusList /> },   // ✅ fixed
  
        { path: "seat/:busId", element: <SeatSelection /> },
  
        {
          path: "admin",
          element: (
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          ),
        },
  
        { path: "admin/add-bus", element: <AddBus /> },
        { path: "admin/buses", element: <ViewBuses /> },
      ],
    },
  ]);