import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../utils/constants';

const MyOrderDetail = () => {
    const {id}=useParams();
   const [orderDetails,setOrderDetails]=useState('')

     const orderDetail=async()=>{
        const res=await axios.get(BASE_URL+"order/"+id,{withCredentials:true})
        setOrderDetails(res.data.data)
     }
    useEffect(()=>{
       orderDetail()
    },[])

    // const {phone,place,fullAddress,pincode}=orderDetails?.address
    //  const {imageUrl,price,quantity,title}=orderDetails?.cartItems[0]
    const {orderStatus,totalAmount,paymentMethod}=orderDetails
  return (
    <div>
        <div className='bg-red-600 w-full'>
            <h1>{orderStatus}</h1>
            <h1>{orderDetails?.address?.phone}</h1>
            </div>
        </div>
  )
}

export default MyOrderDetail