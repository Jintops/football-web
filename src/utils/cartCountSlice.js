import { createSlice } from "@reduxjs/toolkit";

const cartCountSlice=createSlice({
    name:'cartCount',
    initialState:{
        items:[]
    },
    reducers:{
         addItem:(state,action)=>{
           state.items.push(action.payload)
         }
    }
})

export const {addItem}=cartCountSlice.actions;
export default cartCountSlice.reducer