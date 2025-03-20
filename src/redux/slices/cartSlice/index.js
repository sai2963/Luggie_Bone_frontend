import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { variantId, productId, productTitle, variantTitle, price, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.variantId === variantId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({
          variantId,
          productId,
          productTitle,
          variantTitle,
          price: Number(price),
          quantity,
        });
      }

      state.totalQuantity += quantity;
      state.totalAmount += Number(price) * quantity;
    },
    removeCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.variantId === action.payload);

      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];
        state.totalQuantity -= item.quantity;
        state.totalAmount -= item.price * item.quantity;
        state.cartItems.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
