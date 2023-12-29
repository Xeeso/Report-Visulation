import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authState";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
