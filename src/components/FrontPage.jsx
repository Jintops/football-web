import React from 'react';
import { ArrowRight } from 'lucide-react';

const FrontPage = () => {
  return (
    <div className='relative bg-gradient-to-r from-green-600 to-blue-700 w-full h-[600px] flex items-center justify-center px-8'>

      {/* Left: Text Section */}
      <div className="animate-fade-in flex flex-col items-center justify-center w-full md:w-1/2 text-left">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Elevate Your
          <span className="block text-yellow-300">Soccer Game</span>
        </h1>

        <p className="text-green-100 font-semibold text-lg md:text-xl mt-6 max-w-md ml-20">
          Professional soccer gear for players of all levels. From boots to jerseys, find everything you need to dominate the pitch.
        </p>

        <div className="mt-8 flex flex-col md:flex-row gap-4 ml-6">
          <button className="w-48 h-16 bg-white rounded-lg hover:bg-green-200 text-green-500 font-bold flex items-center justify-center hover:shadow-2xl transition-all duration-200 transform hover:scale-105">
            Shop Now 
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="w-48 h-16 border-2 border-white rounded-lg bg-transparent hover:bg-white text-white hover:text-green-500 font-bold transition-all duration-200 transform hover:scale-105">
            View Collections
          </button>
        </div>
      </div>

      {/* Right: Image Section */}
      <div className="relative animate-fade-in w-full md:w-1/2 flex justify-start">
      
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=300&h=300&fit=crop" 
            
            alt="Soccer Cleats"
            className="rounded-2xl shadow-2xl transform rotate-3  transition-transform duration-300 w-72 h-72"
          />
          <img 
            src="https://i.pinimg.com/736x/0c/53/6a/0c536a7b58aa64438a38fac2c7c45f10.jpg" 
            alt="Soccer Ball"
            className="rounded-2xl shadow-2xl transform -rotate-3 transition-transform duration-300 mt-8 w-72 h-72"
          />
        </div>

        {/* Optional Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white opacity-3 rounded-2xl pointer-events-none"></div>

      </div>
      
    </div>
  );
};

export default FrontPage;
