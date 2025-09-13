import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const MyOrderDetail = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  const fetchOrderDetail = async () => {
    try {
      const res = await axios.get(BASE_URL + "order/" + id, {
        withCredentials: true,
      });
      setOrderDetails(res.data.data);
    } catch (err) {
      console.error("Failed to fetch order details:", err);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, []);

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-lg text-gray-600">Loading order details...</p>
      </div>
    );
  }
 
  const { orderStatus, totalAmount, paymentMethod, createdAt } = orderDetails;
  const firstItem = orderDetails?.cartItems?.[0];
 

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-green-800 mb-6 border-b pb-3">
          📦 Order Summary
        </h1>

        {/* Product Section */}
        <div className="flex flex-col sm:flex-row gap-6">
        <Link to={`/productDetails/${firstItem?.productId}`} >
         <img 
            src={firstItem?.imageUrl}
            alt={firstItem?.title}
            className="w-full sm:w-48 h-48 object-contain border rounded-md bg-gray-50"
           /></Link>
          <div className="flex-1 space-y-2">
            <h2 className="text-lg font-semibold text-gray-800">
              {firstItem?.title}
            </h2>
            <p className="text-gray-600">Quantity: {firstItem?.quantity}</p>
            <p className="text-gray-600">Price: ₹ {firstItem?.price}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6" />

        {/* Order Info */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-gray-500 text-sm">Order Status</h3>
            <p className="font-medium text-green-700">{orderStatus}</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Order Date</h3>
            <p>{new Date(createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Amount</h3>
            <p className="font-medium">₹ {totalAmount}</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Payment Method</h3>
            <p>{paymentMethod}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6" />

        {/* Shipping Address */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Shipping Address
          </h3>
          <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700 space-y-1">
            <p>{orderDetails?.address?.name}</p>
            <p>{orderDetails?.address?.phone}</p>
            <p>
              {orderDetails?.address?.fullAddress},{" "}
              {orderDetails?.address?.place} - {orderDetails?.address?.pincode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderDetail;
