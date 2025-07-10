import React from "react";
import { X, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";


const CartPage = ({ onClose }) => {
  const cartItem = useSelector((store) => store.cartCount.items);
 console.log(cartItem)
  console.log(cartItem)
  return (
    <div className="fixed top-0 right-0 h-full w-1/5 bg-white  shadow-lg z-50 transition-transform duration-300 rounded-2xl">
      <div className="flex justify-between bg-gray-200">
        <h1 className="p-4 font-bold text-lg">Shopping Cart</h1>
        <X
          className="w-6 h-6 text-gray-800 mt-5 ml-20 hover:bg-gray-300"
          onClick={onClose}
        />
        <hr className="text-gray-500"></hr>
      </div>
     {cartItem.length === 0 ? (
  <div className="flex flex-col items-center justify-center h-1/2 text-gray-500">
    <ShoppingCart className="w-10 h-10 mb-2" />
    <h1 className="text-lg font-medium">Your Cart is Empty</h1>
  </div>
):(
    <div>
        <h1>{cartItem[0].name}</h1>
    </div>
)}

      
    </div>
  );
};

export default CartPage;
