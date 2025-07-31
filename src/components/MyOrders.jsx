import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

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

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-gray-600 text-lg">⚽ No orders yet. Time to grab some football gear!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-800">⚽ My Orders</h1>

      <div className="space-y-6 max-w-4xl mx-auto">
        {orders.map((order, index) => (
          <div
            key={order._id || index}
            className="bg-white rounded-xl shadow-md border-l-4 border-green-600 p-4 space-y-3 hover:shadow-lg transition-shadow"
          >
            {/* Order Info */}
            <div className="flex items-center gap-4">
              <img
                src={order.cartItems[0]?.imageUrl}
                alt="Product"
                className="w-24 h-24 object-contain border rounded-md"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-green-800">{order.cartItems[0]?.title}</h2>
                <p className="text-sm text-gray-700">Quantity: {order.cartItems[0]?.quantity}</p>
                <p className="text-sm text-gray-700">Total: ₹ {order.totalAmount}</p>
                <p className="text-sm font-medium text-green-700">Payment: {order.paymentMethod}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Address */}
            {/* <div className="text-sm text-gray-800 bg-green-100 rounded-md p-3">
              <p className="font-semibold mb-1 text-green-900">Shipping Address</p>
              <p>{order.address?.name}</p>
              <p>{order.address?.phone}</p>
              <p>{order.address?.fullAddress}, {order.address?.place} - {order.address?.pincode}</p>
            </div> */}

            {/* Order Meta Info */}
            {/* <div className="text-xs text-gray-500 flex justify-between mt-2">
              <p>Order ID: {order._id}</p>
              
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
