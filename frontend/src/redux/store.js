import { configureStore, } from "@reduxjs/toolkit";
import { productApi } from "./api/ProductsApi";
import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath] : authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productApi.middleware , authApi.middleware]),
});
