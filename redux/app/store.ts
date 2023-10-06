import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import workoutReducer from "../features/workouts/workoutSlice"
import regimentReducer from "../features/regiments/regimentsSlice"
export const store = configureStore({
    reducer:{
        auth: authReducer,
        workouts: workoutReducer,
        regiments:regimentReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
});

export type AppDispatch = typeof store.dispatch;