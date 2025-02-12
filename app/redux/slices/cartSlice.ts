import { Product } from "@/app/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  cart: Product[];
  quantity: number;
}
const initialState: CartState = {
  cart: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const exists = state.cart.find(
        (item: Product) => item.id === action.payload.id
      );
      if (!exists) {
        state.cart.push(action.payload);
        state.quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item: Product) => item.id !== action.payload
      );
      if (state.quantity > 0) {
        state.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.quantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
