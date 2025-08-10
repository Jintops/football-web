import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const AdminRestricted = ({user,children}) => {
    const location=useLocation();

    if(user?.role==="admin"){
        return <Navigate to="/admin/overview" replace/>
    }
  return   <> {children}   </>
  
}

export default AdminRestricted