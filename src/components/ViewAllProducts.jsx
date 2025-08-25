import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const categories = ["All", "jersey", "boots", "glove","shinguard","shorts"];

const ViewAllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products,setProducts]=useState([])
  
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);


      const allProducts=async()=>{
  try{
       const res=await axios.get(BASE_URL+"getAllProducts",{withCredentials:true})
       setProducts(res.data.products)
  }catch(err){
    console.log(err)
  }
}

console.log(products)
useEffect(()=>{  
    allProducts()
},[])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Products
      </h1>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-green-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover bg-gray-50  rounded-t-xl"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
              <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* If no products */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No products available in this category.
        </p>
      )}
    </div>
  );
};

export default ViewAllProducts;
