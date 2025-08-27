import React, { useEffect, useState } from 'react'
import Products from './Products'
import product from '../utils/helper'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addItem } from '../utils/cartCountSlice'
import { ArrowRight } from "lucide-react";

const ProductPage = () => {
const [products,setProducts]=useState([]);
const getAllProduct=async()=>{

    
    try{
    const res=await axios.get(BASE_URL+"getAllProducts",{withCredentials:true})
    const products=res.data.products;
    setProducts(products) 

    }catch(err){
        console.log(err)
    }
}
const shuffleArray = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

const randomProducts = shuffleArray(products).slice(0, 8);


 useEffect(()=>{
    getAllProduct();
 },[])
  return (

   
    <div className='my-20 '>
        <div className='flex flex-col justify-center items-center'>
           <h1 className='font-bold text-4xl'>Premium Soccer Equipment</h1>
           <p className='mt-5 text-xl text-green-800'>Discover our premium collection of soccer boots, jerseys, and equipment designed for champions</p>
        </div>
        <div className='flex gap-10 items-center justify-center mt-10 flex-wrap'>
           
         {randomProducts.map((item)=>{
            return(
                <div key={item._id}> <Products  product={item}/>   </div>
            )
         })}
         
        </div>
<div className="flex justify-center mt-10">
    <Link to="/viewallproducts">
  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-700 to-green-400 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
    View All Products →
  </button></Link>
</div>

    </div>
  )
}

export default ProductPage