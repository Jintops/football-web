import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
        userDetail:null,
        isAuthenticated:false,
       
    },
    reducers:{
        addUser:(state,action)=>{
            state.isAuthenticated=true,
            state.userDetail=action.payload
        },
        removeUser:(state,action)=>{
            return null
        }
    }
})


export const {addUser,removeUser}=userSlice.actions
export default userSlice.reducer;