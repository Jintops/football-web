import { createSlice } from "@reduxjs/toolkit";

const searchItemSlice=createSlice({
    name:"search",
    initialState:"",
    reducers:{
        searchInput:(state,action)=>{
            state=action.payload
        }
    }
})


export const {searchInput}=searchItemSlice.actions
export default searchItemSlice.reducer;