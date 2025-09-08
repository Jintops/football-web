import { configureStore } from "@reduxjs/toolkit";
import cartCountReducer from './cartCountSlice'
import userReducer from './userSlice'
import searchReducer from './searchItemSlice'
const appStore=configureStore({
    reducer:{
    cartCount:cartCountReducer,
    user:userReducer,
    search:searchReducer,

    }
})

export default appStore;