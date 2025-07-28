import React from 'react'
import { Outlet } from 'react-router-dom'
import DashBoard from './DashBoard'

const AdminHome = () => {
  return (
    <div>
        <DashBoard/>
        <Outlet/>
    </div>
  )
}

export default AdminHome