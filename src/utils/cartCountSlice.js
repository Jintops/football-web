import { createSlice } from "@reduxjs/toolkit";

const cartCountSlice=createSlice({
    name:'cartCount',
    initialState:{
        items:[]
    },
    reducers:{
         addItem:(state,action)=>{
           state.items.push(action.payload)
         },
         clearCart:(state,action)=>{
            state.items=[]
         },
    }
})

export const {addItem,clearCart}=cartCountSlice.actions;
export default cartCountSlice.reducer