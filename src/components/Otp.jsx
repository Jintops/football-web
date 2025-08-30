import React, { useEffect, useRef, useState } from 'react'


const OTP_COUNT=4

const Otp = () => {

    const [inputArr,setInputArr]=useState(new Array(OTP_COUNT).fill(""))
   const inputRef=useRef([]);

   useEffect(()=>{
      inputRef.current[0]?.focus()
   },[])

    const handleInput=(value,index)=>{
        if(isNaN(value)) return
        const newArr=[...inputArr]
        newArr[index]=value.slice(-1)
        inputRef.current[index+1]?.focus()
        setInputArr(newArr)
    }

  return (
    <div className='h-screen'>
        <div className='text-center'>Verify Otp</div>
        <div className='flex items-center justify-center m-5 '>
        {inputArr.map((input,index)=>(
         
          <input type='text' ref={(input)=>(inputRef.current[index]=input)} key={index} value={inputArr[index]} className='border w-20  p-2 m-2 text-center'
          onChange={(e)=>handleInput(e.target.value,index)}>
          </input> 

       ))}
       
        </div>
    </div>
  )
}

export default Otp