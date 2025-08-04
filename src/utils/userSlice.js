import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
        user:null,
        isAuthenticated:false,
       
    },
    reducers:{
        addUser:(state,action)=>{
            state.isAuthenticated=true,
            state.user=action.payload
        },
        removeUser:(state,action)=>{
            state.user=null
            state.isAuthenticated=false
        }
    }
})


export const {addUser,removeUser}=userSlice.actions
export default userSlice.reducer;