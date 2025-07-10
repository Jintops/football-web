import React from 'react'
import { X } from 'lucide-react'
const CartPage = ({onClose}) => {
  return (
    <div className="fixed top-0 right-0 h-full w-1/5 bg-white  shadow-lg z-50 transition-transform duration-300">
          <div className='flex justify-between bg-gray-200'>
      <h1 className="p-4 font-bold text-lg">Shopping Cart</h1>
      <X className="w-6 h-6 text-gray-800 mt-5 mr-5 hover:bg-gray-300" onClick={onClose} />
      </div>
      <hr className='text-gray-500'></hr>
      {/* Add cart content here */}
    </div>
  )
}

export default CartPage
