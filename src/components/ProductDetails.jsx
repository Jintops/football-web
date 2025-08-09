import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCart, CreditCard } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartCountSlice";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants"; // Import BASE_URL for consistency

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItem = async () => {
    try {
      // Add to backend first
      await axios.post(
        BASE_URL + "addToCart/" + id,
        {},
        { withCredentials: true }
      );
      
      // Then add to Redux store
      dispatch(addItem({ ...product, count: 1 }));
      
      toast.success("Item added to cart!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      
      // Fallback: Still add to Redux even if API fails
      dispatch(addItem({ ...product, count: 1 }));
      
      toast.error("Failed to sync with server, but item added to cart locally", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const productDetails = async (productId) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use BASE_URL for consistency
      const res = await axios.get(`${BASE_URL}product/${productId}`, {
        withCredentials: true,
      });
      
      setProduct(res.data.data);
    } catch (err) {
      console.error("Error fetching product details:", err);
      setError("Failed to load product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = () => {
    // Pass the product as an array to match cart structure
    navigate('/orders', { 
      state: { 
        cartItem: [{ ...product, count: 1 }] // Wrap in array for consistency
      } 
    });
  };

  useEffect(() => {
    if (id) {
      productDetails(id);
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center bg-gray-100 py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-4xl w-full bg-white rounded-xl shadow-md p-8">
          <div className="animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center">
                <div className="h-[400px] w-full bg-gray-300 rounded"></div>
                <div className="flex gap-4 mt-4">
                  <div className="w-40 h-12 bg-gray-300 rounded-lg"></div>
                  <div className="w-40 h-12 bg-gray-300 rounded-lg"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center bg-gray-100 py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => productDetails(id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No product found
  if (!product) {
    return (
      <div className="flex justify-center items-center bg-gray-100 py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-gray-100 py-24 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Image Section */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <img
                src={product.image}
                alt={product.title}
                className="h-[400px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = '/api/placeholder/400/400'; // Fallback image
                }}
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                className="flex items-center justify-center gap-2 w-40 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={cartItem}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                className="flex items-center justify-center gap-2 w-40 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={handleOrder}
              >
                <CreditCard className="w-5 h-5" />
                Buy Now
              </button>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                {product.title}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Brand: {product.brand || 'Not specified'}
              </p>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold text-green-700">
                ${product.price}
              </p>
              {product.salePrice && product.salePrice !== product.price && (
                <p className="text-xl text-gray-500 line-through">
                  ${product.salePrice}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-gray-600 font-medium">
                {product.rating || 'No rating'} 
              </span>
              <span className="text-gray-400 text-sm">
                ({product.reviewCount || 0} reviews)
              </span>
            </div>

            {/* Additional Product Info */}
            <div className="space-y-2">
              {product.category && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium">Category:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {product.category}
                  </span>
                </div>
              )}
              
              {product.inStock !== undefined && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 font-medium">Availability:</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    product.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;