import React, { useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";

const AdminProducts = () => {

  const getAllProducts=async()=>{
   try{
   
    const res=await axios.get("")

   }catch(err){
    console.log(err)
   }
  }

    useEffect(()=>{
        getAllProducts();
    },[])
  return (
    <div className="p-6">
      <h1 className="font-bold text-3xl text-green-700 mb-6">📦 Products List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Static Product Card */}
        <div className="bg-white rounded-xl shadow-md border p-4 hover:shadow-lg transition">
          <img
            src="https://i.pinimg.com/736x/cb/66/3e/cb663e76a1bc4d7844c9f1e88b8c0901.jpg"
            alt="Product"
            className="w-full h-52 object-cover rounded-lg mb-4"
          />
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
            Sample Product Title
          </h2>
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">
            This is a short description of the product to give a brief overview.
          </p>
          <h4 className="text-xl font-bold text-green-600 mb-3">₹999</h4>
          <div className="flex justify-between">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
              <Pencil className="w-4 h-4" />
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
        {/* Repeat static cards as needed for design preview */}
      </div>
    </div>
  );
};

export default AdminProducts;
