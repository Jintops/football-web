import axios from 'axios'
import { AwardIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'




const MyOrders = () => {
   
    const [orders,setOrders]=useState([])
    const orderList=async()=>{
      try{
          const res=await axios.get(BASE_URL+"orderList",{withCredentials:true})
           setOrders(res.data.data)
           console.log(res.data.data)
      }catch(err){
        console.log(err)
      }
    }
    useEffect(()=>{
     orderList();
    },[])
  return (
    <div className='h-screen'>
        <h1 className='text-2xl font-bold'>My Orders</h1>
        {orders.map((order)=>(
        <div className='flex  border m-2 p-2'>
            
           
            <img src={order.cartItems[0].imageUrl} className='w-20 h-20'></img>
           <div className='mx-2 p-2'>
            <h1>{order.cartItems[0].title}</h1>
            <h1>{order.cartItems[0].quantity}</h1>
            <h1>{order.totalAmount}</h1>
            <h1>{order.paymentMethod}</h1>
            </div>
        </div>
        ))}
    </div>
  )
}

export default MyOrders