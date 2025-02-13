import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    users: null as any
  },
});
