import React, { useState, useRef, useEffect} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if(dropdownRef.current && !dropdownRef.current.cotains(e.target)){
        setOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        BusBooking
      </Link>

      <div className="relative" ref={dropdownRef}>
        {user ? (
          <>
            <div
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full bg-white text-blue-600 
                         flex items-center justify-center font-bold cursor-pointer"
            >
              {user.email.charAt(0).toUpperCase()}
            </div>
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                <div className="p-3 border-b text-sm text-gray-600">
                  {user.email}
                </div>

                <Link
                  to="/my-bookings"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  My Bookings
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="space-x-4">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;