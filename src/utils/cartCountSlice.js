import { createSlice } from "@reduxjs/toolkit";

const cartCountSlice = createSlice({
  name: "cartCount",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].count += 1;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.count += 1;
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.count > 1) item.count -= 1;
    },

    clearCart: (state, action) => {
      state.items = [];
    },

    deleteItem: (state, action) => {
      let deleteid = action.payload;
      state.items = state.items.filter((item) => item.id !== deleteid);
    },
  },
});

export const { addItem, clearCart, deleteItem,incrementQuantity,decrementQuantity } = cartCountSlice.actions;
export default cartCountSlice.reducer;
