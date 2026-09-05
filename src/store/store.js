import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../redux/moviesSlice"
import authReducer from "../redux/authSlice"


export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        auth: authReducer,
    }
})