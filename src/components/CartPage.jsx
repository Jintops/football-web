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
  
  // ✅ Get cart from Redux
  const cartItems = useSelector((store) => store.cartCount.items);
  const navigate = useNavigate();

  // ✅ Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "cartItems", { withCredentials: true });

      dispatch(resetCart());

      if (res.data.data.items && Array.isArray(res.data.data.items)) {
        const normalizedCart = res.data.data.items.map((item) => {
          if (item.productId) {
            return {
              ...item.productId,
              count: item.quantity || 1,
              _id: item.productId._id,
            };
          }
          return {
            ...item,
            count: item.quantity || item.count || 1,
          };
        });
        dispatch(setCart(normalizedCart));
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Calculate total
  const totalAmount = cartItems.reduce((acc, item) => {
    const price = item.salePrice || item.price || 0;
    return acc + price * (item.count || 1);
  }, 0);

  // ✅ Clear cart
 const clearCartt = async () => {
   try { 
    await axios.delete(BASE_URL + "removeCart", { withCredentials: true }); dispatch(clearCart());
   } catch (error) {
     console.error("Error clearing cart:", error);
  dispatch(clearCart());
  } };

  // ✅ Buy Now
  const handleOrder = () => {
    navigate("/orders", { state: { cartItem: cartItems } });
    onClose();
  };

  // ✅ Loading
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

  // ✅ Final UI
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
                refreshCart={fetchCart} // ✅ ensures + / - syncs with backend
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