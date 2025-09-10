import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PHOTO_1, PHOTO_2 } from '../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const FrontPage = () => {
  const navigate=useNavigate()
   const cartItems = useSelector((store) => store.cartCount.items);
   const handleOrder = () => {
    navigate("/orders", { state: { cartItem: cartItems } });
    onClose();
  };
  return (
    <div className="relative bg-gradient-to-r from-green-600 to-blue-700 w-full h-auto min-h-[600px] flex flex-col md:flex-row items-center justify-center px-4 md:px-8 py-12">

      {/* Left: Text Section */}
      <div className="animate-fade-in flex flex-col items-center  justify-center w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Elevate Your
          <span className="block text-yellow-300">Soccer Game</span>
        </h1>

        <p className="text-green-100  font-semibold text-base md:text-xl mt-6 max-w-md ">
          Professional soccer gear for players of all levels. From boots to jerseys, find everything you need to dominate the pitch.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 md:ml-6">
          <button className="w-full sm:w-48 h-12 md:h-18 bg-white rounded-lg hover:bg-green-200 text-green-500 font-bold flex items-center justify-center hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
          onClick={handleOrder}>
            Shop Now 
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        <Link to="/viewallproducts"> <button className="w-full sm:w-48 h-12 md:h-18 border-2 border-white rounded-lg bg-transparent hover:bg-white text-white hover:text-green-500 font-bold transition-all duration-200 transform hover:scale-105 p-2">
            View Collections
          </button></Link> 
        </div>
      </div>
    
      {/* Right: Image Section */}
      <div className="relative animate-fade-in w-full md:w-1/2 flex justify-center md:justify-start mt-12 md:mt-0">
        <div className="grid grid-cols-2 gap-4">
          <img 
            src={PHOTO_1}
            alt="Soccer Cleats"
            className="rounded-2xl shadow-2xl transform rotate-3  transition-transform duration-300 w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72"
          />
          <img 
            src={PHOTO_2} 
            alt="Soccer Ball"
            className="rounded-2xl shadow-2xl transform -rotate-3  transition-transform duration-300 mt-4 sm:mt-6 md:mt-8 w-36 h-36 sm:w-56 sm:h-56 md:w-72 md:h-72"
          />
        </div>

        <div className=" md:w-3/4  absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-10 rounded-2xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default FrontPage;
