import React, { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartCountSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Products = ({ product }) => {
  const { title, price, image, description, rating, _id } = product;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const detailedProduct = () => {
    navigate(`/productdetails/${_id}`);
  };

  const cartItems = async (e) => {
    e.stopPropagation();
    
    try {
      const res = await axios.post(
        BASE_URL + "addToCart/" + _id,
        {},
        { withCredentials: true }
      );
      
      console.log("API Response:", res.data);
      
      // Simply add the current product to Redux store
      // The API handles the backend, Redux handles the frontend state
      dispatch(addItem({ ...product, count: 1 }));
      
      toast.success("Item added to cart!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      
    } catch (error) {
      console.error("Error adding item to cart:", error);

      dispatch(addItem({ ...product, count: 1 }));
      
      toast.success("Item added to cart!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      className="grid overflow-hidden shadow-xl transition-all duration-300 transform hover:-translate-y-2 group rounded-2xl cursor-pointer"
      onClick={detailedProduct}
    >
      <div className="card bg-base-100 w-80 shadow-lg">
        <figure className="px-10 pt-8 flex justify-center">
          <img
            src={image}
            alt={title}
            className="rounded-xl h-80 w-60 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title font-bold text-lg">{title}</h2>
          <p className="line-clamp-2">{description}</p>
          <span>⭐️ ⭐️ ⭐️ ⭐️ {rating}</span>
          <div className="card-actions flex justify-center gap-4">
            <h1 className="text-2xl font-bold mt-1">₹{price}</h1>
            <button
              className="mb-3 flex justify-center gap-2 border bg-green-600 w-40 px-4 py-2 text-white font-bold rounded-lg hover:bg-green-700 transition"
              onClick={cartItems}
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;