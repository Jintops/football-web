import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Home from "./components/Home"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login"

function App() {
  
  return (
    
    <Provider store={appStore}>
         <ToastContainer />
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Body/>}>
          <Route index element={<Home/>}/>
       
          </Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>

      </div>
  </BrowserRouter>
  </Provider>
  )
}

export default App
