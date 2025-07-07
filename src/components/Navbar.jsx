import React from 'react'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { ShoppingCart } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='flex w-full h-16 justify-around border-b items-center'>
        <div className=' '>
            <h1 className='font-bold text-2xl text-black'>SoccerGear</h1>
        </div>
        <div className=''>
            <ul className='flex gap-8'>
                <li>Home</li> 
                 <li>Jersey</li>   
                  <li>Boots</li>  
                  <li>Equipments</li> 
                   <li>Contact</li>             
            </ul>
        </div>
        <div className='flex gap-4'>
            <input type='text' className='border h-8 p-2 border-gray-500 rounded-full' placeholder='Search jersey,boots...'></input>
             <ShoppingCart className="w-6 h-6 text-gray-700" />
   
                </div>
    </div>
  )
}

export default Navbar