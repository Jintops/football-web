import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
        userDetail:null,
        isAuthenticated:null,
        user:null,
    },
    reducers:{
        addUser:(state,action)=>{
            return isAuthenticated=true,user=action.payload.role,userDetail=action.payload
        },
        removeUser:(state,action)=>{
            return null
        }
    }
})


export const {addUser,removeUser}=userSlice.actions
export default userSlice.reducer;