import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import CartPage from './CartPage';
import { LOGO } from '../utils/constants';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = useSelector((store) => store.cartCount.items);

  return (
    <nav className="w-full sticky top-0 z-50 bg-white shadow-md">
     
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 md:px-10">
       
        <div className="flex items-center space-x-2">
          <img className="w-12 h-10 object-contain" src={LOGO} alt="Logo" />
          <h1 className="font-bold text-xl sm:text-2xl text-black">SoccerGear</h1>
        </div>

       
        <ul className="hidden md:flex gap-6 lg:gap-8 font-medium text-gray-700">
          <li className="hover:text-green-500 cursor-pointer"><Link to="/">Home</Link></li>
          <li className="hover:text-green-500 cursor-pointer">Jersey</li>
          <li className="hover:text-green-500 cursor-pointer">Boots</li>
          <li className="hover:text-green-500 cursor-pointer">Equipments</li>
          <li className="hover:text-green-500 cursor-pointer">Contact</li>
        </ul>

        
        <div className="hidden lg:flex items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search jersey, boots..."
            />
          </div>
        </div>

        
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
        
          <div className="relative">
            <ShoppingCart
              className="w-6 h-6 text-gray-700 hover:text-green-500 cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            />
            {cartCount.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cartCount.length}
              </span>
            )}
          </div>

         
          <User className="w-6 h-6 text-gray-700" />

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
        <div className="md:hidden px-4 pb-4 space-y-4 animate-slide-down">
          <ul className="flex flex-col gap-3 text-gray-700 font-medium">
            <li className="hover:text-green-500 cursor-pointer"><Link to="/">Home</Link></li>
            <li className="hover:text-green-500 cursor-pointer">Jersey</li>
            <li className="hover:text-green-500 cursor-pointer">Boots</li>
            <li className="hover:text-green-500 cursor-pointer">Equipments</li>
            <li className="hover:text-green-500 cursor-pointer">Contact</li>
          </ul>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search..."
            />
          </div>
        </div>
      )}

      
      {isCartOpen && <CartPage onClose={() => setIsCartOpen(false)} />}
    </nav>
  );
};

export default Navbar;
