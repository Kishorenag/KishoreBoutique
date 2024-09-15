// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';
import { saveStateToLocalStorage, loadStateFromLocalStorage } from './localStorage';

// Load the state from localStorage when the store initializes
const persistedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: persistedState, // Load persisted state into the store
});

// Subscribe to store changes to save the state to localStorage
store.subscribe(() => {
  saveStateToLocalStorage({
    cart: store.getState().cart, // You can specify which part of the state to persist
  });
});

export default store;
