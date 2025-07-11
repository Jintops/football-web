import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Home from "./components/Home"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        </Routes>
      </div>
  </BrowserRouter>
  </Provider>
  )
}

export default App
