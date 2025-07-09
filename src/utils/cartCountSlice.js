import { createSlice } from "@reduxjs/toolkit";

const cartCountSlice=createSlice({
    name:'cartCount',
    initialState:{
        value:0,
    },
    reducers:{
           Increment:(state,action)=>{
            state.value+=1
           },
           Decrement:(state,action)=>{
            state.value-=1
           }
    }
})

export const {Increment,Decrement}=cartCountSlice.actions;
export default cartCountSlice.reducer