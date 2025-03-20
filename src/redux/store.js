import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import storage from "redux-persist/lib/storage"; // Local storage
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "cart",
  storage, // Saves data in localStorage
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer, // Use the persisted reducer
  },
});

export const persistor = persistStore(store);
export default store;
