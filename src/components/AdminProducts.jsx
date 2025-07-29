import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const AdminProducts = () => {
  const [product, setProduct] = useState([]);
  const getAllProducts = async () => {
    try {
      const res = await axios.get(BASE_URL + "getAllProducts", {
        withCredentials: true,
      });
      const products = res.data.products;
      setProduct(products);
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className="p-6">
      <h1 className="font-bold text-3xl text-green-700 mb-6">
        📦 Products List
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {product.map((item) => (
          <div className="bg-white rounded-xl shadow-md border p-4 hover:shadow-lg transition">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-52 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {item.title}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-2 mb-2">
              {item.description}
            </p>
            <h4 className="text-xl font-bold text-green-600 mb-3">
              ₹{item.price}
            </h4>
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
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
