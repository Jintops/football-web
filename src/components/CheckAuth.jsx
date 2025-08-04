import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const CheckAuth = ({user,isAuthenticated,children}) => {
    const location=useLocation();
    if(location.pathname === "/orders"){
        if(!isAuthenticated){
            return <Navigate to="/login"/>
        }else{
            if(user.role!=="admin"){
                return <Navigate to="/orders"/>
            }else{
                return <Navigate to='/admin/overview'/>
            }
        }
    }

  return (
    <div>{children}</div>
  )
}

export default CheckAuth