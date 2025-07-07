import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Home from "./components/Home"


function App() {
  
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Body/>}>
          <Route path="home" element={<Home/>}/>
          
          </Route>
        </Routes>
      </div>
  </BrowserRouter>
  )
}

export default App
