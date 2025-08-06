import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  deleteItem,
  incrementQuantity,
} from "../utils/cartCountSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const CartProduct = ({ item }) => {
  const { _id, title, image, price, count, } = item.productId;
  const {quantity}=item
  const dispatch = useDispatch();
  

  const deleteItems = async(_id) => {
    const res=await axios.patch(BASE_URL+"deleteCartItem/"+_id,{},{withCredentials:true})
  };

  

  return (
    <div className="w-full px-2 ">
      <div className="flex flex-row gap-4 items-center bg-gray-50 p-4 rounded-xl shadow-sm mt-6 h-28">
        
        <img
          className="w-20 h-20 sm:w-20 sm:h-20 object-cover rounded-lg"
          src={image}
          alt={title}
        />

        
        <div className="flex-1 w-full sm:w-auto">
          <h1 className="text-base font-semibold line-clamp-2">{title}</h1>
          <p className="text-gray-600 mt-1">${price}</p>

          <div className="flex items-center gap-2 ">
            <button
              onClick={() => quantity > 1 && dispatch(decrementQuantity(_id))}
              className="text-lg font-bold px-1 py-1  rounded hover:bg-gray-100"
            >
              -
            </button>
            <span className="min-w-[20px] text-center">{quantity}</span>
            <button
              onClick={() => dispatch(incrementQuantity(_id))}
              className="text-lg font-bold px-1 py-1  rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col items-end sm:items-center sm:justify-between  h-full">
          <p className="font-bold">${(price * quantity).toFixed(2)}</p>
          <Trash2
            onClick={() => deleteItems(_id)}
            className="h-5 w-5 text-red-500 mt-2 hover:text-red-700 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
