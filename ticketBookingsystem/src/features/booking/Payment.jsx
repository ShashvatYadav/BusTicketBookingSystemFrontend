import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../services/axiosInstance";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { busId, seatIds, bookingDate, totalPrice } = location.state || {};

  const [paymentMode, setPaymentMode] = useState("UPI");
  const [loading, setLoading] = useState(false);

  if (!busId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No booking data found.</p>
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      setLoading(true);

      await api.post("/bookings", {
        busId,
        seatIds,
        bookingDate,
        paymentMode
      });

      alert("Payment Successful & Booking Confirmed!");
      navigate("/my-bookings");
    } catch (err) {
      alert("Booking failed after payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Complete Your Payment
        </h2>

        <div className="mb-4">
          <p className="text-gray-600">Total Amount</p>
          <p className="text-2xl font-semibold text-green-600">
            ₹{totalPrice}
          </p>
        </div>

        <div className="mb-6">
          <p className="font-medium mb-2">Select Payment Method</p>

          <div className="space-y-3">
            <label className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value="UPI"
                checked={paymentMode === "UPI"}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="mr-3"
              />
              UPI
            </label>

            <label className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value="CARD"
                checked={paymentMode === "CARD"}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="mr-3"
              />
              Credit / Debit Card
            </label>

            <label className="flex items-center border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                value="NET_BANKING"
                checked={paymentMode === "NET_BANKING"}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="mr-3"
              />
              Net Banking
            </label>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default Payment;