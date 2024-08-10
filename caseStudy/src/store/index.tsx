import { configureStore } from "@reduxjs/toolkit";
import patientReducer, { saveStateMiddleware } from "./patinetSlice";

export const store = configureStore({
  reducer: {
    patients: patientReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveStateMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
