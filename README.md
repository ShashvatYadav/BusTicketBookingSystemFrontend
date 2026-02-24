# 🚌 Bus Ticket Booking System – Frontend

A modern React-based web application for booking bus tickets.  
Users can search buses, select seats, complete payments, and view their booking history.

This project connects to a Spring Boot backend secured with JWT authentication.

---

## 🚀 Tech Stack

- React.js (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- Context API (Authentication Management)
- JWT Authentication

---

## ✨ Features

- 🔐 User Registration & Login
- 🚌 Browse Available Buses
- 💺 Seat Selection (Booked seats disabled in real-time)
- 💳 Payment Page with Payment Mode Selection
- 📜 Booking History Page
- 👤 Profile Dropdown with Booking Access
- 🔒 Protected Routes for Authenticated Users
- 🔄 Axios Interceptor for JWT Token

---

## 📂 Project Structure
src/
│
├── components/
│   ├── Navbar.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── SeatSelection.jsx
│   ├── Payment.jsx
│   ├── BookingHistory.jsx
│   ├── Login.jsx
│   └── Register.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── services/
│   └── axiosInstance.js
│
└── App.jsx
---

## 🔐 Authentication Flow

1. User logs in.
2. Backend returns JWT token.
3. Token is stored in `localStorage`.
4. Axios interceptor automatically attaches token to API requests.
5. Protected pages (Booking, Payment, History) require authentication.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
git clone 
cd 

### 2️⃣ Install Dependencies
npm install

### 3️⃣ Start Development Server
npm run dev
Application runs at: http://localhost:5173

---

## 🔗 Backend Configuration

Make sure backend runs at: http://localhost:8080/api
Update API base URL in: src/services/axiosInstance.js
Example:

```js
baseURL: "http://localhost:8080/api"

🎨 UI Highlights
	•	Responsive layout using Tailwind CSS
	•	Seat grid layout
	•	Color-coded booking status
	•	Profile avatar dropdown
	•	Professional booking cards

⸻

📌 Future Improvements
	•	Online Payment Gateway Integration
	•	Seat Locking Mechanism
	•	Booking Cancellation Feature
	•	Profile Page with Editable Details
	•	Admin Dashboard

⸻

👨‍💻 Author

Shashvat Yadav
Frontend Developer | React | JavaScript | Tailwind CSS
