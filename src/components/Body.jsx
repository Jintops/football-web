import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Body