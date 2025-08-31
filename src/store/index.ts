import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./slices/favouritesSlice";

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
