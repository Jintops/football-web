import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { clearCart } from "../utils/cartCountSlice";

const OrderPage = () => {
  const { state } = useLocation();
  const { cartItem, product } = state || {};
  const products = cartItem || (product ? [product] : []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [quantities, setQuantities] = useState(
    products.map((p) => p.count || 1)
  );

  if (!products || products.length === 0) {
    return (
      <p className="h-screen text-center mt-10 text-red-500 font-semibold">
        No product(s) found
      </p>
    );
  }

  const handleQuantityChange = (index, value) => {
    const updated = [...quantities];
    updated[index] = parseInt(value);
    setQuantities(updated);
  };

  const handleOrder = async () => {
    try {
      for (let i = 0; i < products.length; i++) {
        const prod = products[i];
        const quantity = quantities[i];
        const totalAmount = prod.price * quantity;

        await axios.post(
          BASE_URL + "createOrder",
          {
            address: {
              name,
              phone,
              pincode,
              place,
              fullAddress: address,
            },
            paymentMethod,
            productId: prod._id,
            quantity,
            totalAmount,
          },
          { withCredentials: true }
        );
      }

      alert("Order placed successfully!");
      if (cartItem) dispatch(clearCart());
      navigate("/myorders");
    } catch (err) {
      console.error("Order error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Shipping & Payment */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">
            Shipping Information
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            className="border rounded px-4 py-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="border rounded px-4 py-2 w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="number"
            placeholder="Pincode"
            className="border rounded px-4 py-2 w-full"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />

          <input
            type="text"
            placeholder="Place"
            className="border rounded px-4 py-2 w-full"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />

          <textarea
            placeholder="Full Address"
            className="border rounded px-4 py-2 w-full"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="pt-4 border-t">
            <h3 className="text-md font-semibold mb-2">Payment Method</h3>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={() => setPaymentMethod("Cash on Delivery")}
              />
              Cash On Delivery
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="Online"
                checked={paymentMethod === "Online"}
                onChange={() => setPaymentMethod("Online")}
              />
              Online
            </label>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Order Summary</h2>

          {products.map((prod, idx) => (
            <div className="flex gap-4 mb-6" key={idx}>
              <img
                src={prod.image}
                alt={prod.title}
                className="w-32 h-32 object-contain border rounded"
              />
              <div>
                <h3 className="text-lg font-medium">{prod.title}</h3>
                <p className="text-gray-700 mt-1">Price: ₹ {prod.price}</p>
                <div className="mt-3">
                  <label className="block mb-1 font-medium">Quantity</label>
                  <input
                    type="number"
                    value={quantities[idx]}
                    min={1}
                    className="border px-3 py-1 rounded w-24"
                    onChange={(e) => handleQuantityChange(idx, e.target.value)}
                  />
                </div>
                <p className="mt-2 font-semibold text-green-600">
                  Total: ₹ {prod.price * quantities[idx]}
                </p>
              </div>
            </div>
          ))}

          <button
            onClick={handleOrder}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
