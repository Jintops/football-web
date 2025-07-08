import React from 'react'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'
const Products = () => {
  return (
    <div className='grid  grid-cols-1 md:grid-cols-3'>
        <div className="card bg-base-100 w-96 shadow-lg">
  <figure className="px-10 pt-10">
    <img
      src="https://i.pinimg.com/736x/d7/fd/79/d7fd79788139d0a77d63aaf2e7c6d827.jpg"
      alt="Shoes"
      className="rounded-xl h-80 w-60" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Jersey</h2>
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