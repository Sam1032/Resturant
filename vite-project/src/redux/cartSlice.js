import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    // Add item or increase quantity if already exists
    AddItem: (state, action) => {
      const existing = state.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    // Increment quantity
    incrementItem: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    // Decrement quantity
    decrementItem: (state, action) => {
      const item = state.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // Remove item completely
    removeItem: (state, action) => {
      return state.filter(i => i.id !== action.payload);
    },
  },
});

export const { AddItem, incrementItem, decrementItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
