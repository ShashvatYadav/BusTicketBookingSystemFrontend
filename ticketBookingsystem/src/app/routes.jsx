import { createBrowserRouter } from "react-router";
import UserLayout from "../layouts/UserLayout";
import SearchBus from "../features/bus/SearchBus";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import SeatSelection from "../features/booking/SeatSelection";

export const router = createBrowserRouter([
    {
        path : "/",
        element : <UserLayout/>,
        children : [
            {index : true, element : <SearchBus/>},
            {path : "login", element : <Login/>},
            {
                path : "register", element : <Register/>
            },
            { path : "seat/:busId", element : <SeatSelection/>},
        ],
    },
])