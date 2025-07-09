import { configureStore } from "@reduxjs/toolkit";
import cartCountReducer from './cartCountSlice'

const appStore=configureStore({
    reducer:{
    cartCount:cartCountReducer
    }
})

export default appStore;