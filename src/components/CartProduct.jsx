import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { decrementQuantity, deleteItem, incrementQuantity } from "../utils/cartCountSlice";

const CartProduct = ({ item }) => {
  const {id, name, image, price,count } = item;
  
  const dispatch=useDispatch();

  

  const deleteItems=(id)=>{
    dispatch(deleteItem(id))
  }

  return (
    <div className="w-full px-2">
      <div className="flex flex-wrap md:flex-nowrap m-4 items-center bg-gray-50 p-4 rounded-lg gap-4 justify-between">
        <img
          className="w-20 h-20 object-cover rounded-lg"
          src={image}
          alt={name}
        />

        <div className="flex flex-col flex-grow min-w-0">
          <h1 className="line-clamp-2 text-sm sm:text-base font-semibold">
            {name}
          </h1>
          <h2 className="text-gray-700">${price}</h2>

          <div className="flex gap-4 items-center mt-2">
            <span
              onClick={()=>count > 1 && dispatch(decrementQuantity(id))}
              className="text-xl font-bold cursor-pointer"
            >
              -
            </span>
            <h1>{count}</h1>
            <span
              onClick={()=>dispatch(incrementQuantity(id))}
              className="text-xl font-bold cursor-pointer"
            >
              +
            </span>
          </div>
        </div>

     <div className="flex flex-col items-end ml-auto text-sm sm:text-base font-bold">
  <span className="">${(price * count).toFixed(2)}</span>
  <Trash2 className="h-4 w-4 text-red-500 mt-4 cursor-pointer hover:text-red-700" onClick={()=>deleteItems(id)}/>
</div>


      </div>
    </div>
  );
};

export default CartProduct;
