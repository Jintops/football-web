import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { PackageX } from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const navigate = useNavigate();
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}orderList?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      setOrders(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);
  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-10 flex flex-col items-center max-w-md w-full border border-gray-200">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <PackageX className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 text-center">
            No Orders Found
          </h2>
          <p className="text-gray-600 text-center mb-8 leading-relaxed">
            Looks like you haven’t placed any orders yet. Start exploring and
            add something to your cart!
          </p>

          <Link to="/viewallproducts" className="w-full">
            <button className="w-full px-5 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-md">
              Browse Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const orderDetail = (orders) => {
    navigate(`/myorderdetails/${orders._id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-800">
        ⚽ My Orders
      </h1>

      <div className="space-y-6 max-w-4xl mx-auto">
        {orders.map((order, index) => (
          <div
            onClick={() => orderDetail(order)}
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
                <h2 className="text-lg font-semibold text-green-800">
                  {order.cartItems[0]?.title}
                </h2>
                <p className="text-sm text-gray-700">
                  Quantity: {order.cartItems[0]?.quantity}
                </p>
                <p className="text-sm text-gray-700">
                  Total: ₹ {order.totalAmount}
                </p>
                <p className="text-sm font-medium text-green-700">
                  Payment: {order.paymentMethod}
                </p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyOrders;
