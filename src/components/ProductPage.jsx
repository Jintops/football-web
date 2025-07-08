import React from 'react'
import Products from './Products'

const ProductPage = () => {
  return (
    <div className='my-20 '>
        <div className='flex flex-col justify-center items-center'>
           <h1 className='font-bold text-4xl'>Premium Soccer Equipment</h1>
           <p className='mt-5 text-xl text-green-800'>Discover our premium collection of soccer boots, jerseys, and equipment designed for champions</p>
        </div>
        <div className='flex  gap-10 items-center justify-center mt-10 flex-wrap'>
           
         <Products/>
         <Products/>
         <Products/>
         <Products/>
         
        </div>
    </div>
  )
}

export default ProductPage