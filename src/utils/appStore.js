import { configureStore } from "@reduxjs/toolkit";
import cartCountReducer from './cartCountSlice'
import userReducer from './userSlice'
const appStore=configureStore({
    reducer:{
    cartCount:cartCountReducer,
    user:userReducer,

    }
})

export default appStore;