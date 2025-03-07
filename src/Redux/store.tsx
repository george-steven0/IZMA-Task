import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./Slices/navSlice";

export const store = configureStore({
  reducer: {
    nav: navSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
