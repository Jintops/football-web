import React, { useEffect } from 'react'




const MyOrders = () => {

    const orderList=async()=>{
      try{

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
        <div className='flex  border m-2 p-2'>
            
           
            <img src='https://i.pinimg.com/736x/1b/61/f8/1b61f8160dcbc9364166230d0f73f3b6.jpg' className='w-20 h-20'></img>
           <div className='mx-2 p-2'>
            <h1>order.name</h1>
            <h1>quantity</h1>
            <h1>price</h1>
            <h1>paymentmethod</h1>
            </div>
        </div>
    </div>
  )
}

export default MyOrders