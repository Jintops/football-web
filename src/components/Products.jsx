import React from 'react'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
const Products = () => {
  return (
    <div className='grid overflow-hidden shadow-xl transition-all duration-300 transform hover:-translate-y-2 group rounded-2xl'>
        <div className="card bg-base-100 w-80 shadow-lg">
  <figure className="px-10 pt-10 flex justify-center ">
    <img
      src="https://i.pinimg.com/736x/d7/fd/79/d7fd79788139d0a77d63aaf2e7c6d827.jpg"
      alt="Shoes"
      className="rounded-xl h-80 w-60 object-cover group-hover:scale-105 transition-transform duration-500" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title font-bold text-lg mt-5">Football Jersey</h2>
    <p>Authentic team jersey with moisture-wicking fabric and official team colors.</p>
    <span>⭐️ ⭐️ ⭐️ ⭐️ (4.6)</span>
   <div className="card-actions flex justify-center gap-4 ">
    <h1 className='text-2xl font-bold mt-1'>$19.00</h1>
  <button className="mb-3 flex  justify-center gap-2 border bg-green-600 w-40 px-4 py-2 text-white font-bold rounded-lg hover:bg-green-700 transition">
   <ShoppingCart className="w-5 h-5 text-white" />
   Add to Cart
    
  </button>
</div>

  </div>
</div>
    </div>
  )
}

export default Products