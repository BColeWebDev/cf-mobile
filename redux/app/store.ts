import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import workoutReducer from "../features/workouts/workoutSlice";
import regimentReducer from "../features/regiments/regimentsSlice";
import trainingDaysReducer from "../features/trainingDays/trainingDaysSlice";
import sharableReducer from "../features/sharables/sharableSlice";
import nutritionReducer from "../features/nutritions/nutritionSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    sharables: sharableReducer,
    workouts: workoutReducer,
    regiments: regimentReducer,
    trainingDays: trainingDaysReducer,
    nutritions: nutritionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
