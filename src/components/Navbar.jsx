import React, { useState } from 'react'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import CartPage from './CartPage'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
const cartCount=useSelector((store)=>store.cartCount.items)
 const [isCartOpen,setIsCartOpen]=useState(false)

  return (
  <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">

    
      <div className="flex items-center justify-between h-16 px-4 md:px-10">
        <div className='flex '>
        <img 
        className="w-16 h-10"
        src='data:image/jpeg;base64,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'></img>
        <h1 className="font-bold text-2xl text-black">SoccerGear</h1>
</div>
        
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
 <div className="relative mr-4 md:mr-6">
  <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-green-500" onClick={()=>setIsCartOpen(true)} />
  {cartCount.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
      {cartCount.length}
    </span>
  )}
</div>

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
   {isCartOpen &&  <CartPage onClose={()=>setIsCartOpen(false)}/>}
    </nav>
  )
}

export default Navbar
