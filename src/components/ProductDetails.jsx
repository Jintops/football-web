import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart,CreditCard } from "lucide-react";
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartCountSlice';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
 const dispatch=useDispatch();

  const cartItem=()=>{
    dispatch(addItem(product))
      toast.success("Item added to cart!", {
          position: "bottom-right",
          autoClose: 3000,
        });
  }

  const productDetails = async (id) => {
    try {
      const res = await axios.get(`http://localhost:7777/product/${id}`, {
        withCredentials: true,
      });
      setProduct(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    productDetails(id);
  }, [id]);

  if (!product) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex  justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="h-[696px] max-w-4xl w-full bg-white rounded-xl shadow-md overflow-hidden grid md:grid-cols-2 gap-8 p-8">
        <div className="flex flex-col items-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-[400px] w-auto object-contain"
          />
        <div className="flex gap-4">
  <button className="flex items-center justify-center gap-2 w-40 mt-4 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
  onClick={cartItem}>
    <ShoppingCart className="w-5 h-5 text-white" />
    Add to Cart
  </button>
  
  <button className="flex items-center justify-center gap-2 w-40 mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
    <CreditCard className="w-5 h-5 text-white" />
    Buy Now
  </button>
</div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold text-green-700">₹ {product.price}</p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-xl">⭐️ ⭐️ ⭐️ ⭐️ ⭐️ {product.rating}</span>
            <span className="text-gray-500 text-sm">({product.brand})</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
