import React, { useState } from 'react'

const CartProduct = ({item,}) => {
    const {name,image,price}=item;
    const [count,setCount]=useState(1)
  return (
    <div className=''>
        <div className='flex m-6  h-20 items-center space-x-4 bg-gray-50 p-4 rounded-lg '>
            <img className=" w-16 h-16 object-cover rounded-lg"src={image}></img>
            <div className='flex flex-col'>
            <h1>{name}</h1>  
            <h2>${price}</h2>
            <div className='flex gap-4 cursor-pointer'>
            <span onClick={()=>setCount(count-1)}>-</span>
            <h1>{count<1 ? 1 : count}</h1>
            <span onClick={()=>setCount(count+1)}>+</span>
            </div>
            </div>
        </div>
     

    </div>
  )
}

export default CartProduct