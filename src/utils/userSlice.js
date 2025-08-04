import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("userDetail"));
const userSlice=createSlice({
    name:'user',
    initialState:{
        user:savedUser || null,
        isAuthenticated:!!savedUser,
       
    },
    reducers:{
        addUser:(state,action)=>{
            state.isAuthenticated=true,
            state.user=action.payload

            localStorage.setItem("userDetail", JSON.stringify(action.payload));
        },
        removeUser:(state,action)=>{
            state.user=null
            state.isAuthenticated=false

                 localStorage.removeItem("userDetail");
        }
    }
})


export const {addUser,removeUser}=userSlice.actions
export default userSlice.reducer;