import React from 'react'

const CartProduct = ({item}) => {
    const {name,image,price}=item
  return (
    <div>
        <div className='flex m-6  h-20 items-center space-x-4 bg-gray-50 p-4 rounded-lg'>
            <img className=" w-16 h-16 object-cover rounded-lg"src={image}></img>
            <div className='flex flex-col'>
            <h1>{name}</h1>  
            <h2>${price}</h2>
            </div>
        </div>
    </div>
  )
}

export default CartProduct