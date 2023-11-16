import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const initialState = {
  cartItem: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItem.find(
        (i) => i.product === item.product
      );
      if (isItemExist) {
        state.cartItem = state.cartItem.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItem = [...state.cartItem, item];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },
  },
});

export default cartSlice.reducer;

export const { setCartItem } = cartSlice.actions;
