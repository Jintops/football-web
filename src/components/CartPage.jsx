import React from "react";
import { X, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import CartProduct from "./CartProduct";
import { clearCart } from "../utils/cartCountSlice";


const CartPage = ({ onClose }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((store) => store.cartCount.items);

  return (
    <div className="fixed top-0 right-0 h-full w-full sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[20%] bg-white shadow-lg z-50 transition-transform duration-300 rounded-l-2xl flex flex-col">
     
      <div className="flex justify-between items-center bg-gray-200 px-4 py-3 border-b">
        <h1 className="font-bold text-lg">Shopping Cart</h1>
        <X
          className="w-6 h-6 text-gray-800 cursor-pointer hover:bg-gray-300 rounded"
          onClick={onClose}
        />
      </div>

      {/* Empty Cart */}
      {cartItem.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-gray-500 p-4">
          <ShoppingCart className="w-10 h-10 mb-2" />
          <h1 className="text-lg font-medium">Your Cart is Empty</h1>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-3 pb-4">
          {cartItem.map((item, index) => (
            <CartProduct key={index} item={item}  />
          ))}

        
          <div className="mt-4">
            <button
              onClick={()=>dispatch(clearCart())}
              className="w-full border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-50 hover:text-red-700"
            >
              Clear cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
