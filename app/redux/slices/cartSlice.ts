import { Product } from "@/app/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface CartState {
  cart: Product[];
}
const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item: Product) => item.id !== action.payload
      );
    },
    updateQuantity: (state, action) => {
      state.cart = state.cart.map((item: Product) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
