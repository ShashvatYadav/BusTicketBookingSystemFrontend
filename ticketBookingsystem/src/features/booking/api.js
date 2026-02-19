import api from "../../services/axiosInstance"

export const createBooking = (data) => {
    return api.post("/bookings", data);
}

export const getBookings = () => {
    return api.get("/bookings/my");
}