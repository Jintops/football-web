import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Home from "./components/Home"
import { Provider, useSelector } from "react-redux"
import appStore from "./utils/appStore"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login"
import Signup from "./components/Signup"
import ProductDetails from "./components/ProductDetails"
import AdminProducts from "./components/AdminProducts"
import AdminOrderList from "./components/AdminOrderList"
import AdminListOfUsers from "./components/AdminListOfUsers"
import AdminHome from "./components/AdminHome"
import AdminOverView from "./components/AdminOverView"
import OrderPage from "./components/OrderPage"
import MyOrders from "./components/MyOrders"
import Profile from "./components/Profile"
import CheckAuth from "./components/CheckAuth"

function App() {
   
  const {user,isAuthenticated}=useSelector((store)=>store.user)
  
  return (
       
      <div>
        <Routes>
          <Route path="/" element={<Body/>}>
          <Route index element={<Home/>}/>
         
          <Route path="/productdetails/:id" element={<ProductDetails/>}></Route>
          <Route path="/orders" element={<CheckAuth user={user} isAuthenticated={isAuthenticated}>
             <OrderPage/>
          </CheckAuth>}></Route>

         <Route path="/myorders"  element={<MyOrders/>}></Route>
         <Route path="profile" element={<Profile/>}></Route>
          </Route>

         <Route path="/login" element={<Login role="User"/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/admin/login" element={<Login role="Admin"/>}></Route>

           <Route path="/admin" element={<AdminHome/>}>   
            <Route index element={<AdminOverView/>}></Route>    
            <Route path="overview" element={<AdminOverView/>}></Route>  
            <Route path="products" element={<AdminProducts/>}></Route>
            <Route path="orderlist" element={<AdminOrderList/>}></Route>
             <Route path="userlist" element={<AdminListOfUsers/>}></Route>
             </Route>
        </Routes>

      </div>

  
  )
}

export default App
