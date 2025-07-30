import React from 'react'

const OrderPage = () => {
  return (
    <div className='h-screen'>
        <div className='flex border m-2 bg-gray-200 items-center'>
           <input type='text' placeholder='name' className='border m-2 p-2'></input>
           <input type='number' placeholder='pincode' className='border m-2 p-2'></input>
           <textarea placeholder='Address' className='border m-2 p-2'></textarea>
           <input type='text' placeholder='place' className='border m-2 p-2'></input>
           <input type='tel' placeholder='number' className='border m-2 p-2'></input>
           <button className='btn btn-info'>Save</button>
        </div>

    <div className="flex gap-4 border flex-col m-2 p-2">
  <label className="flex items-center gap-2">
    <input type="radio" name="payment" value="cod" />
    Cash On Delivery
  </label>

  <label className="flex items-center gap-2">
    <input type="radio" name="payment" value="online" />
    Online
  </label>
</div>


  
        <div>
            <button className='btn btn-active'>Place order</button>
        </div>
    </div>
  )
}

export default OrderPage