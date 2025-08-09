import React, { useEffect, useState } from "react";
import { X, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "./CartProduct";
import { addItem, clearCart } from "../utils/cartCountSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const CartPage = ({ onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  
  // Get cart items from Redux store
  const cartItems = useSelector((store) => store.cartCount.items);
  
  const navigate = useNavigate();

  // Calculate total amount
  const totalAmount = cartItems.reduce((acc, item) => {
    const price = item.salePrice || item.price || 0;
    const quantity = item.count || item.quantity || 1;
    return acc + price * quantity;
  }, 0);

  const clearCartt = async () => {
    try {
      await axios.delete(BASE_URL + "removeCart", { withCredentials: true });
      dispatch(clearCart());
    } catch (error) {
      console.error("Error clearing cart:", error);
      // Still clear Redux store even if API fails
      dispatch(clearCart());
    }
  };

  const handleOrder = () => {
    navigate('/orders', { state: { cartItem: cartItems } });
    onClose();
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await axios.get(BASE_URL + "cartItems", { withCredentials: true });
        
        console.log("Cart API Response:", res.data);
        
        // Clear existing cart first
        dispatch(clearCart());
        
        // Add each item individually to match Redux slice expectations
        if (res.data.data.items && Array.isArray(res.data.data.items)) {
          res.data.data.items.forEach(item => {
            // Normalize the item structure
            let normalizedItem;
            
            if (item.productId) {
              // If item has productId (populated product), flatten it
              normalizedItem = {
                ...item.productId,
                count: item.quantity || 1,
                _id: item.productId._id
              };
            } else {
              // If item is already flattened
              normalizedItem = {
                ...item,
                count: item.quantity || item.count || 1
              };
            }
            
            dispatch(addItem(normalizedItem));
          });
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCart();
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
        <div className="fixed top-0 right-0 h-full w-full sm:w-[60%] md:w-[40%] lg:w-[35%] xl:w-[25%] bg-white shadow-lg z-50 transition-transform duration-300 rounded-l-2xl flex flex-col">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300 bg-gray-100">
            <h1 className="font-bold text-lg">Shopping Cart</h1>
            <X
              className="w-6 h-6 text-gray-800 cursor-pointer hover:bg-gray-300 rounded"
              onClick={onClose}
            />
          </div>
          <div className="flex flex-col items-center justify-center flex-1 text-gray-500 p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2">Loading cart...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[60%] md:w-[40%] lg:w-[35%] xl:w-[25%] bg-white shadow-lg z-50 transition-transform duration-300 rounded-l-2xl flex flex-col">
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-300 bg-gray-100">
          <h1 className="font-bold text-lg">Shopping Cart</h1>
          <X
            className="w-6 h-6 text-gray-800 cursor-pointer hover:bg-gray-300 rounded"
            onClick={onClose}
          />
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-gray-500 p-4">
            <ShoppingCart className="w-10 h-10 mb-2" />
            <h1 className="text-lg font-medium">Your Cart is Empty</h1>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-3 pb-4">
            {cartItems.map((item, index) => (
              <CartProduct 
                key={item._id || index} 
                item={item} 
              />
            ))}

            <div className="mt-4">
              <button
                onClick={clearCartt}
                className="w-full border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-50 hover:text-red-700"
              >
                Clear cart
              </button>
            </div>
          </div>
        )}
        
        {cartItems.length > 0 && (
          <div>
            <div className="border-t h-12 flex justify-between items-center font-bold mb-2 text-base p-5">
              <h1 className="font-bold">Total:</h1>
              <h1>${totalAmount.toFixed(2)}</h1>
            </div>
            <div className="flex justify-center m-4">
              <button 
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
                onClick={handleOrder}
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;