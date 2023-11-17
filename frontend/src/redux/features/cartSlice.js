import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCartItem : (state , action) => {
      const filteredCartItem = state.cartItems.filter((item) => {
        return item.product !== action.payload;
      });
      state.cartItems = filteredCartItem
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }
  },

});

export default cartSlice.reducer;

export const { setCartItem , removeCartItem } = cartSlice.actions;
