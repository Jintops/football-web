import React, { useState } from 'react'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartCountSlice'

const Products = ({product}) => {
    const{name,price,image,description,rating}=product;
   
   const dispatch=useDispatch()
    const cartItems=(product)=>{
      dispatch(addItem(product));
    }
  return (
    <div className='grid overflow-hidden shadow-xl transition-all duration-300 transform hover:-translate-y-2 group rounded-2xl'>
        <div className="card bg-base-100 w-80 shadow-lg">
  <figure className="px-10 pt-10 flex justify-center ">
    <img
      src={image}
      alt="Shoes"
      className="rounded-xl h-80 w-60 object-cover group-hover:scale-105 transition-transform duration-500" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title font-bold text-lg mt-5">{name}</h2>
    <p className='line-clamp-2'>{description}</p>
    <span>⭐️ ⭐️ ⭐️ ⭐️ {rating}</span>
   <div className="card-actions flex justify-center gap-4 ">
    <h1 className='text-2xl font-bold mt-1'>${price}</h1>
  <button className="mb-3 flex  justify-center gap-2 border bg-green-600 w-40 px-4 py-2 text-white font-bold rounded-lg hover:bg-green-700 transition"
   onClick={()=>cartItems(product)}>
   <ShoppingCart className="w-5 h-5 text-white" />
   Add to Cart
    
  </button>
 
</div>

  </div>
</div>
    </div>
  )
}

export default Products