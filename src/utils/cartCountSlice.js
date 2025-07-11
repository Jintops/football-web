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
         deleteItem:(state,action)=>{
           let deleteid=action.payload;
           state.items=state.items.filter((item)=>item.id !== deleteid)
         }
    }
})

export const {addItem,clearCart,deleteItem}=cartCountSlice.actions;
export default cartCountSlice.reducer