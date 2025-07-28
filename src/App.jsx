import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Home from "./components/Home"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login"
import Signup from "./components/Signup"
import ProductDetails from "./components/ProductDetails"

function App() {
  
  return (
    
    <Provider store={appStore}>
         <ToastContainer />
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Body/>}>
          <Route index element={<Home/>}/>
         
          <Route path="/productdetails/:id" element={<ProductDetails/>}></Route>
         
          </Route>
         <Route path="/login" element={<Login role="User"/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
           <Route path="/admin/login" element={<Login role="Admin"/>}></Route>
        </Routes>

      </div>
  </BrowserRouter>
  </Provider>
  )
}

export default App
