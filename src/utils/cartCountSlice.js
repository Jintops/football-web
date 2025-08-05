import { createSlice } from "@reduxjs/toolkit";

const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const cartCountSlice = createSlice({
  name: "cartCount",
  initialState: {
    items: savedCartItems,
  },
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
       localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) item.count += 1;
       localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item && item.count > 1) item.count -= 1;
       localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearCart: (state, action) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },

    deleteItem: (state, action) => {
      let deleteid = action.payload;
      state.items = state.items.filter((item) => item._id !== deleteid);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

export const { addItem, clearCart, deleteItem,incrementQuantity,decrementQuantity } = cartCountSlice.actions;
export default cartCountSlice.reducer;
