import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { UserX, Edit2, Save, X, User } from 'lucide-react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate=useNavigate()
  const fetchOrders = async () => {
    try {
      const res = await axios.get(BASE_URL + "orderList", { withCredentials: true });
      setOrders(res.data.data);
      
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders.length===0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
        <div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center max-w-md w-full">
          <UserX className="w-14 h-14 text-red-500 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2 text-center">Order Not Found</h2>
          <p className="text-gray-600 text-center mb-6">
            We couldn't find your Order. Please log in to access your account and view your order information.
          </p>
          <Link to="/login" className="w-full">
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition duration-200">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const orderDetail=(orders)=>{
  navigate(`/myorderdetails/${orders._id}`);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4" >
      <h1 className="text-3xl font-bold mb-8 text-center text-green-800">⚽ My Orders</h1>

      <div className="space-y-6 max-w-4xl mx-auto">
        {orders.map((order, index) => (
          <div onClick={() => orderDetail(order)}
            key={order._id || index}
            className="bg-white rounded-xl shadow-md border-l-4 border-green-600 p-4 space-y-3 hover:shadow-lg transition-shadow"
          >
            
            <div className="flex items-center gap-4">
              <img
                src={order.cartItems[0]?.imageUrl}
                alt="Product"
                className="w-24 h-24 object-contain border rounded-md"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-green-800">{order.cartItems[0]?.title}</h2>
                <p className="text-sm text-gray-700">Quantity: {order.cartItems[0]?.quantity}</p>
                <p className="text-sm text-gray-700">Total: ₹ {order.totalAmount/100}</p>
                <p className="text-sm font-medium text-green-700">Payment: {order.paymentMethod}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
