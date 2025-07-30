import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const OrderPage = () => {
  const { state } = useLocation();
  const { product } = state || {};

  const [name, setName] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [place, setPlace] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>No product found</p>;

  const handleOrder = async () => {
    try {
      const totalAmount = product.price * quantity;

      const res = await axios.post(
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
          productId: product._id,
          quantity,
          totalAmount,
        },
        { withCredentials: true }
      );

      alert("Order placed successfully!");
    } catch (err) {
      console.error("Order error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      {/* Address Form */}
      <div className="bg-white rounded shadow p-4 space-y-2">
        <h2 className="text-lg font-bold">Shipping Details</h2>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Pincode"
          className="border p-2 w-full"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <textarea
          placeholder="Full Address"
          className="border p-2 w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Place"
          className="border p-2 w-full"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="border p-2 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Payment Options */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-bold mb-2">Select Payment Method</h2>
        <label className="flex items-center gap-2 mb-2">
          <input
            type="radio"
            name="payment"
            value="Cash on Delivery"
            checked={paymentMethod === 'Cash on Delivery'}
            onChange={() => setPaymentMethod('Cash on Delivery')}
          />
          Cash On Delivery
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="Online"
            checked={paymentMethod === 'Online'}
            onChange={() => setPaymentMethod('Online')}
          />
          Online
        </label>
      </div>

      {/* Product Summary */}
      <div className="bg-white rounded shadow p-4 space-y-2">
        <h2 className="text-lg font-bold">Product Summary</h2>
        <img src={product.image} alt={product.title} className="h-32 w-auto object-contain" />
        <h1>{product.title}</h1>
        <p>Price: ₹ {product.price}</p>

        <label className="block mt-2">Quantity:</label>
        <input
          type="number"
          value={quantity}
          min={1}
          className="border p-2 w-20"
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <p className="font-semibold mt-2">Total: ₹ {product.price * quantity}</p>
      </div>

      {/* Place Order Button */}
      <div className="text-right">
        <button
          onClick={handleOrder}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
