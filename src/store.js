// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./slices/classSlice";

export const store = configureStore({
  reducer: {
    classes: classReducer,
  },
});

export default store;
