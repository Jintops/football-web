import { createSlice } from "@reduxjs/toolkit";

const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const cartCountSlice = createSlice({
  name: "cartCount",
  initialState: {
    items: savedCartItems,
  },
  reducers: {
    addItem: (state, action) => {
  const { _id, count = 1 } = action.payload;
  const itemIndex = state.items.findIndex((item) => item._id === _id);

  if (itemIndex >= 0) {
    state.items[itemIndex].count += count;  
  } else {
    state.items.push({ ...action.payload, count });
  }

  localStorage.setItem("cartItems", JSON.stringify(state.items));
},

    
    // New action to set entire cart (useful for API sync)
    setCart: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        item.count += 1;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item && item.count > 1) {
        item.count -= 1;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },

    deleteItem: (state, action) => {
      const deleteId = action.payload;
      state.items = state.items.filter((item) => item._id !== deleteId);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

export const { 
  addItem, 
  setCart, 
  clearCart, 
  deleteItem, 
  incrementQuantity, 
  decrementQuantity 
} = cartCountSlice.actions;

export default cartCountSlice.reducer;