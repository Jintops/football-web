import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'

const AdminOrderList = () => {
  const [orders,setOrders]=useState([])
   const getAllOrders=async()=>{
    const res=await axios.get(BASE_URL+"orders",{withCredentials:true})
     setOrders(res.data.data)
     console.log(res.data.data)
   }

    useEffect(()=>{
     getAllOrders()
    },[])
  return (
    <div className='p-6'>
         <h1 className="text-xl font-bold mb-4 text-gray-800">All Orders</h1>
     {orders.map((item)=>(
        <div className='border m-2 p-2 flex '>
            <div>
            <img  className='w-20 h-20' src={item.cartItems[0].imageUrl} alt='img'></img>
            </div>
            <div className='m-2 p-2'>
            <h1>{item.address.name}</h1>
            <h1>{item.cartItems[0].title}</h1>
            <h3>{item.cartItems[0].price}</h3>
            <p>{item.address.fullAddress}</p>
            <h2>{item.orderStatus}</h2>
            <h4>{item.cartItems[0].quantity}</h4>
            <h1>{item.paymentMethod}</h1>
              <p>Date: {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
        </div>
))}
    </div>
  )
}

export default AdminOrderList