import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userReducer } from "./features";
//import { } from "./services";

export const store = configureStore({
  reducer: {
    userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
