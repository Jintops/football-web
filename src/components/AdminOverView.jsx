import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'

const AdminOverView = () => {

    const [total,setTotal]=useState([])
    const overView=async()=>{
         const res=await axios.get(BASE_URL+"getAllProducts",{withCredentials:true})
         setTotal(res.data.products)
    }

     const totall=total.length

    useEffect(()=>{
       overView()
    },[])
  return (
    <div>
           <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-500">Welcome back, Admin!</p>
        </div>

       
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Total Products</h3>
            <p className="text-2xl font-bold">{totall}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold">450</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Total Users</h3>
            <p className="text-2xl font-bold">320</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold">$15,240</p>
          </div>
        </div>

        {/* Placeholder Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
            <p className="text-gray-500">[Order Table Placeholder]</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-4">Top Selling Products</h3>
            <p className="text-gray-500">[Product List Placeholder]</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOverView