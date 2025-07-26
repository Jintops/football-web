import React, { useEffect, useState } from 'react'
import Products from './Products'
import product from '../utils/helper'
import axios from 'axios'
const ProductPage = () => {
const [products,setProducts]=useState([]);

const getAllProduct=async()=>{
    try{
    const res=await axios.get("http://localhost:7777/getAllProducts",{withCredentials:true})
    const products=res.data.products;
    setProducts(products)
    // console.log(products)
    }catch(err){
        console.log(err)
    }
}


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
           
         {products.map((item)=>{
            return(
                <div key={item._id}><Products  product={item}/>  </div>
            )
         })}
         
        </div>
    </div>
  )
}

export default ProductPage