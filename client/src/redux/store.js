import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

export function configureAppStore() {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  return store;
}
