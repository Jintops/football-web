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


const CartProduct = ({ item,refreshCart }) => {
  const product = item.productId || item;

  const {_id, title, image, price,count } = product;
  
  const dispatch = useDispatch();
  

  const deleteItems = async(_id) => {
    try{
    const res=await axios.patch(BASE_URL+"deleteCartItem/"+_id,{},{withCredentials:true})
    dispatch(deleteItem(_id))
    }catch(err){
      console.log(err.message)
      dispatch(deleteItem(_id));
    }
  };

  const editQuantity=async(newCount)=>{
    const res=await axios.put(BASE_URL+"cartEdit/"+_id,{quantity:newCount},{withCredentials:true})
  }

  const increment = () => {
    const newCount = count + 1;
    dispatch(incrementQuantity(_id));
    editQuantity(newCount);
  };

  const decrement=()=>{
    const newCount=count-1
    count > 1 && dispatch(decrementQuantity(_id))
    editQuantity(newCount)
  }

  
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
          <p className="text-gray-600 mt-1">₹{price}</p>

          <div className="flex items-center gap-2 ">
            <button
              onClick={decrement}
              className="text-lg font-bold px-1 py-1  rounded hover:bg-gray-100"
            >
              -
            </button>
            <span className="min-w-[20px] text-center">{count}</span>
            <button
              onClick={increment}
              className="text-lg font-bold px-1 py-1  rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col items-end sm:items-center sm:justify-between  h-full">
          <p className="font-bold">${(price * count).toFixed(2)}</p>
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
