import React, { useState } from 'react'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="w-full border-b">
    
      <div className="flex items-center justify-between h-16 px-4 md:px-10">
      
        <h1 className="font-bold text-2xl text-black">SoccerGear</h1>

        
        <ul className="hidden md:flex gap-8 cursor-pointer  font-medium text-gray-700">
          <li className="hover:text-green-500">Home</li>
          <li className="hover:text-green-500">Jersey</li>
          <li className="hover:text-green-500">Boots</li>
          <li className="hover:text-green-500">Equipments</li>
          <li className="hover:text-green-500">Contact</li>
        </ul>

        
        <div className="hidden md:flex gap-4 items-center">
          <div className="relative flex">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="border h-10 pl-10 pr-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Search jersey, boots..."
            />
            
          </div>
          
        </div>

  <div className='flex '>
 <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-green-500 mr-4 md:mr-6" />
            <User className="w-6 h-6 text-gray-700 mr-6 md:ml-0" />  
       

        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-800" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>
 </div>
     
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col cursor-pointer gap-3 text-gray-700">
            <li className="hover:text-green-500">Home</li>
            <li className="hover:text-green-500">Jersey</li>
            <li className="hover:text-green-500">Boots</li>
            <li className="hover:text-green-500">Equipments</li>
            <li className="hover:text-green-500">Contact</li>
          </ul>
         
          <div className="mt-4 flex items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="w-full border h-10 pl-10 pr-2 border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Search..."
              />
            </div>
           
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
