import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
 
  const getAllOrders = async () => {
    try {
      const res = await axios.get(BASE_URL + "orders", { withCredentials: true });
      setOrders(res.data.data);
      
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleStatus = async (id, value) => {
  try {
    const res = await axios.patch(
      BASE_URL + "orderStatus/" + id,
      { status: value },
      { withCredentials: true }
    );

    // Update local state immediately so UI reflects change
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, orderStatus: value } : order
      )
    );

    console.log("Status updated:", res.data);
  } catch (err) {
    console.error("Failed to change status", err);
  }
};


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">📦 All Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((item) => (
            <div key={item._id} className="bg-white shadow-sm rounded-xl p-4 border border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          
              <div className="w-full md:w-[12%]">
                <img
                  className="w-20 h-20 object-cover rounded border"
                  src={item.cartItems[0].imageUrl}
                  alt="product"
                />
              </div>

           
              <div className="w-full md:w-[25%] text-sm text-gray-700">
                <h2 className="font-semibold text-base text-gray-900">{item.address.name}</h2>
                <p>{item.address.fullAddress}</p>
                <p>Pincode: {item.address.pincode}</p>
              </div>

             
              <div className="w-full md:w-[18%] text-sm text-gray-700">
                 <p className='font-bold text-base text-gray-900'><span className="font-medium">Product:</span> {item.cartItems[0].title}</p>
                <p><span className="font-medium">Qty:</span> {item.cartItems[0].quantity}</p>
                <p><span className="font-medium">Payment:</span> {item.paymentMethod}</p>
                  <p><span className="font-medium">Date:</span> {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="w-full md:w-[15%] text-sm text-gray-700">
                <p><span className="font-medium">Price:</span> ₹{item.cartItems[0].price*item.cartItems[0].quantity}</p>
              </div>

            
<div className="w-full md:w-[20%] text-sm">
  <p>
    <span className="font-medium">Status:</span>{" "}
    <select
      onChange={(e) => handleStatus(item._id, e.target.value)}
      value={item.orderStatus}
      className={`font-semibold border rounded-lg px-4 p-1 outline-none
        ${item.orderStatus === "delivered" ? "text-green-600 border-green-600" :
          item.orderStatus === "cancelled" ? "text-red-600 border-red-600" :
          item.orderStatus === "shipping" ? "text-blue-900 border-blue-900" :
          "text-yellow-600 border-yellow-600"}
      `}
    >
      <option value="pending">Pending</option>
      <option value="shipping">Shipping</option>
      <option value="delivered">Delivered</option>
      <option value="cancelled">Cancelled</option>
    </select>
  </p>
</div>



            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;
