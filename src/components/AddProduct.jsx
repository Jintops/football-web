import React, { useState } from 'react'

const AddProduct = () => {

    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [price,setPrice]=useState('')

    const handleAddProduct=async()=>{

    }

  return (
    <div>
         <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        
      />
       <div className="fixed top-0 right-0 h-full w-full sm:w-[60%] md:w-[40%] lg:w-[35%] xl:w-[25%] bg-white shadow-lg z-50 transition-transform duration-300 rounded-l-2xl flex flex-col">
        <div className="flex justify-between items-center  px-4 py-3 border-b border-gray-300 bg-gray-100">
        <h1 className="font-bold text-lg">Add Products</h1>
        <div className='flex flex-col gap-3'>
            <input value={title} type='text' placeholder='title' className='border rounded-md' onChange={(e)=>setTitle(e.target.value)}></input>
            <textarea value={description} placeholder='descrition' className='border rounded-md'onChange={(e)=>setDescription(e.target.value)}></textarea> 
            <input value={price} type='text' placeholder='price' className='border rounded-md'onChange={(e)=>setPrice(e.target.value)}></input>
            
            <button className='btn btn-info' onClick={handleAddProduct}>ADD</button>
        </div>
        </div>
        </div>
    </div>
  )
}

export default AddProduct