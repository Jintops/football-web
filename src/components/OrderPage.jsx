import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { clearCart } from "../utils/cartCountSlice";
import {
  ShoppingBag,
  CreditCard,
  Truck,
  MapPin,
  Phone,
  User,
  Plus,
  Minus,
  CheckCircle,
  ArrowLeft,
  AlertCircle,
  Target,
} from "lucide-react";

const OrderPage = () => {
  const { state } = useLocation();
  const { cartItem, product } = state || {};
  const products = cartItem || (product ? [product] : []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("ied");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState(9605255705);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [quantities, setQuantities] = useState(
    products.map((p) => p.count || 1)
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [allAddress,setAllAddress]=useState([])
  const [openAddress,setOpenAddress]=useState(false)
  const [edit,setEdit]=useState("")



  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen  flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full border border-green-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Products Found
          </h2>
          <p className="text-gray-600 mb-6">
            Your cart seems empty! Browse our football gear and add some
            products to score your perfect order.
          </p>
          <button
            onClick={() => navigate("/viewallproducts")}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-lg"
          >
            Browse Football Gear
          </button>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Player name is required";
    // if (!phone.trim()) newErrors.phone = "Contact number is required";
    // else if (!/^\d{10}$/.test(phone.trim()))
    //   newErrors.phone = "Contact number must be 10 digits";
    // if (!pincode.trim()) newErrors.pincode = "Pincode is required";
    // else if (!/^\d{6}$/.test(pincode.trim()))
    //   newErrors.pincode = "Pincode must be 6 digits";
    if (!place.trim()) newErrors.place = "City is required";
    if (!address.trim()) newErrors.address = "Delivery address is required";
    if (!paymentMethod)
      newErrors.paymentMethod = "Please select a payment method";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuantityChange = (index, value) => {
    const newValue = Math.max(1, parseInt(value) || 1);
    const updated = [...quantities];
    updated[index] = newValue;
    setQuantities(updated);
  };

  const incrementQuantity = (index) => {
    const updated = [...quantities];
    updated[index] = updated[index] + 1;
    setQuantities(updated);
  };

  const decrementQuantity = (index) => {
    const updated = [...quantities];
    if (updated[index] > 1) {
      updated[index] = updated[index] - 1;
      setQuantities(updated);
    }
  };

  const calculateTotal = () => {
    return products.reduce((total, prod, index) => {
      return total + prod.price * quantities[index];
    }, 0);
  };

  const calculateItemCount = () => {
    return quantities.reduce((total, quantity) => total + quantity, 0);
  };

  const handleOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      for (let i = 0; i < products.length; i++) {
        const prod = products[i];
        const quantity = quantities[i];
        // const totalAmount = prod.price * quantity;
            const totalAmount=   calculateTotal()*100
        await axios.post(
          BASE_URL + "createOrder",
          {
            address: {
              name: name.trim(),
              phone,
              pincode: pincode,
              place: place.trim(),
              fullAddress: address.trim(),
            },
            paymentMethod,
            productId: prod._id,
            quantity,
            totalAmount,
          },
          { withCredentials: true }
        );
      }

      if (cartItem) dispatch(clearCart());
      navigate("/myorders");
    } catch (err) {
      console.error("Order error:", err);
      setErrors({
        general:
          err.response?.data?.message || "Goal missed! Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };


const handleEditAddress=async(adds)=>{
    setEdit(true)
    setOpenAddress(true)
     setName(adds.name);
      setPincode(adds.pincode);
      setPlace(adds.place);
      setAddress(adds.fullAddress);
     setPhone(adds.phone);  
}

  const handlePaymentOrder=async()=>{
   if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      for (let i = 0; i < products.length; i++) {
        const prod = products[i];
        const quantity = quantities[i];
        const totalAmount = calculateTotal()*100;


      const order=await axios.post(BASE_URL+"payment/create",{
            address: {
              name: name.trim(),
              phone,
              pincode: pincode.trim(),
              place: place.trim(),
              fullAddress: address.trim(),
            },
            paymentMethod,
            productId: prod._id,
            quantity,
            totalAmount,
          },
        {withCredentials:true})
        

        const {keyId,savedPayment}=order.data
       console.log(order.data)
      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount:savedPayment.totalAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Soccer Gear',
        description: 'shop your items',
        order_id: savedPayment.orderId,
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

        const rzp = new window.Razorpay(options);
        rzp.open();
    }

if (cartItem) dispatch(clearCart());
      navigate("/myorders");

    }catch(err){
      console.log(err)
    }
  }

const getAddress=async()=>{
  try{
     const res=await axios.get(BASE_URL+"allAddress",{withCredentials:true})
     setAllAddress(res.data.data)
  }catch(err){
    console.log(err)
  }
}

const handleDeleteAddress=async(id)=>{
  try{
   const res=await axios.delete(BASE_URL+"deleteAddress/"+id,{withCredentials:true})
   setAllAddress((prev) => prev.filter((addr) => addr._id !== id)); 
  }catch(err){
    console.log(err)
  }
}

  useEffect(()=>{
    getAddress();
  },[])

  const handleNewAddress=async()=>{
    try{
      if(!edit){
     const res=await axios.post(BASE_URL+"address",{name,pincode,fullAddress:address,place,phone},{withCredentials:true})
     setAllAddress((prev) => [...prev, res.data.data]);
     setOpenAddress(false)
      }
      else{
        const res=await axios.put(BASE_URL+"editAddress/"+allAddress._id,{name,pincode,phone,place,fullAddress:address},{withCredentials:true})
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Shipping & Payment */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-6 mt-6">
  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
    <MapPin className="w-5 h-5 text-green-600" />
    Saved Addresses
  </h3>

  {allAddress.length === 0 && (
    <p className="text-gray-600 italic">No saved addresses. Add one below 👇</p>
  )}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {allAddress.map((adds) => (
      <div
        key={adds._id}
        className={`p-5 rounded-2xl border-2 shadow-sm transition duration-200 ${
          adds.isDefault
            ? "border-green-500 bg-green-50"
            : "border-gray-200 hover:border-green-300"
        }`}
      >
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-lg font-semibold text-gray-900">{adds.name}</h4>
          {/* {adds.isDefault && (
            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-lg">
              Default
            </span>
          )} */}
        </div>

        <p className="text-gray-700">
          📍 {adds.fullAddress}, {adds.place}, {adds.pincode}
        </p>
        <p className="text-gray-700 mt-1">📞 {adds.phone}</p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => {
              setName(adds.name);
              setPincode(adds.pincode);
              setPlace(adds.place);
              setAddress(adds.fullAddress);
              setPhone(adds.phone);
            }}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-green-700 transition"
          >
            Use this
          </button>
          <button
            onClick={() => handleEditAddress(adds)}
            className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-yellow-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteAddress(adds._id)}
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

<button
  className={`px-4 py-2 font-semibold rounded-xl ${
    openAddress ? "" : "bg-blue-600"
  } text-white`}
onClick={() => {
  setOpenAddress(!openAddress);
  setEdit(false);
}}

>
  {!openAddress ? "Add New Address" : ""}
</button>


            {/* Shipping Information */}
        {openAddress &&   <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-green-100">
                {/* <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                  <Truck className="w-6 h-6 text-white" />
                </div> */}
                
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    🚚 Delivery Information
                  </h2>
                  <p className="text-green-600 text-sm">
                    Where should we deliver your football gear?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2 text-green-600" />
                    Player Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 ${
                      errors.name
                        ? "border-red-400 bg-red-50"
                        : "border-green-200 hover:border-green-300"
                    }`}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      ⚠️ {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2 text-green-600" />
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 ${
                      errors.phone
                        ? "border-red-400 bg-red-50"
                        : "border-green-200 hover:border-green-300"
                    }`}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      ⚠️ {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2 text-green-600" />
                    Pincode *
                  </label>
                  <input
                    type="text"
                    placeholder="6-digit pincode"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 ${
                      errors.pincode
                        ? "border-red-400 bg-red-50"
                        : "border-green-200 hover:border-green-300"
                    }`}
                    value={pincode}
                    onChange={(e) => {
                      setPincode(e.target.value);
                      if (errors.pincode) setErrors({ ...errors, pincode: "" });
                    }}
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      ⚠️ {errors.pincode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    🏙️ City *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your city"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 ${
                      errors.place
                        ? "border-red-400 bg-red-50"
                        : "border-green-200 hover:border-green-300"
                    }`}
                    value={place}
                    onChange={(e) => {
                      setPlace(e.target.value);
                      if (errors.place) setErrors({ ...errors, place: "" });
                    }}
                  />
                  {errors.place && (
                    <p className="text-red-500 text-sm mt-1 font-medium">
                      ⚠️ {errors.place}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  🏠 Complete Delivery Address *
                </label>
                <textarea
                  placeholder="House/Flat No., Street, Landmark, Area"
                  className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 ${
                    errors.address
                      ? "border-red-400 bg-red-50"
                      : "border-green-200 hover:border-green-300"
                  }`}
                  rows={3}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) setErrors({ ...errors, address: "" });
                  }}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1 font-medium">
                    ⚠️ {errors.address}
                  </p>
                )}
              </div>
            <div className="flex justify-center gap-8 my-4">
               <button className="px-4 py-2 font-semibold rounded-xl bg-gray-500 text-white" onClick={()=>setOpenAddress(false)}>Cancel</button>
              <button className="px-4 py-2 font-semibold rounded-xl bg-green-500 text-white"
               onClick={handleNewAddress}>{edit ? "Edit" : "Save"}</button>
              </div>
            </div>}



            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-green-100">
                {/* <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-lg">
                  <CreditCard className="w-6 h-6 text-white" />
                </div> */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    💳 Payment Method
                  </h2>
                  <p className="text-green-600 text-sm">
                    Choose your preferred payment option
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer hover:bg-green-50 hover:border-green-300 transition duration-200">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={() => {
                      setPaymentMethod("Cash on Delivery");
                      if (errors.paymentMethod)
                        setErrors({ ...errors, paymentMethod: "" });
                    }}
                    className="w-5 h-5 text-green-600 focus:ring-green-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-900">
                        💵 Cash on Delivery
                      </p>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                        POPULAR
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Pay when your football gear arrives at your doorstep
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer hover:bg-green-50 hover:border-green-300 transition duration-200">
                  <input
                    type="radio"
                    name="payment"
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={() => {
                      setPaymentMethod("Online");
                      if (errors.paymentMethod)
                        setErrors({ ...errors, paymentMethod: "" });
                    }}
                    className="w-5 h-5 text-green-600 focus:ring-green-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-900">
                        🔐 Online Payment
                      </p>
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                        SECURE
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Pay securely with UPI, Cards, or Net Banking
                    </p>
                  </div>
                </label>
              </div>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm mt-3 font-medium">
                  ⚠️ {errors.paymentMethod}
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 sticky top-4">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-green-100">
                {/* <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div> */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    ⚽ Your Cart
                  </h2>
                  <p className="text-green-600 text-sm">
                    Review your football gear
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {products.map((prod, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-4  rounded-xl border-2 border-green-200"
                  >
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-16 h-16 object-cover rounded-lg border-2 border-green-200 shadow-sm"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/64?text=⚽";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate text-sm">
                        {prod.title}
                      </h3>
                      <p className="text-green-600 font-bold mb-2">
                        ₹{prod.price.toLocaleString()}
                      </p>

                      <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-green-200">
                        <button
                          onClick={() => decrementQuantity(idx)}
                          className="p-1 hover:bg-green-100 rounded text-green-600 transition duration-200"
                          disabled={quantities[idx] <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={quantities[idx]}
                          min={1}
                          className="w-12 text-center border-0 bg-transparent font-bold text-gray-900 text-sm focus:outline-none"
                          onChange={(e) =>
                            handleQuantityChange(idx, e.target.value)
                          }
                        />
                        <button
                          onClick={() => incrementQuantity(idx)}
                          className="p-1 hover:bg-green-100 rounded text-green-600 transition duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-sm font-bold text-emerald-600 mt-2">
                        Total: ₹
                        {(prod.price * quantities[idx]).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-green-100 pt-4 mt-6">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Subtotal ({calculateItemCount()} items)
                    </span>
                    <span className="font-bold text-gray-900">
                      ₹{calculateTotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Delivery Charges
                    </span>
                    <span className="font-bold text-green-600">FREE ⚡</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl border-t-2 border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      🏆 Grand Total
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {errors.general && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-xl mt-4">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 font-medium">{errors.general}</p>
                </div>
              )}

           {paymentMethod!=="Online" &&   <button
                onClick={handleOrder}
                disabled={loading}
                className={`w-full mt-6 py-4 px-6 rounded-2xl font-bold text-white transition duration-200 flex items-center justify-center gap-3 text-lg shadow-lg ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-95 shadow-green-300"
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Scoring Your Order...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Score This Order!
                  </>
                )}
              </button>}


               {paymentMethod==="Online" &&     <button
                onClick={handlePaymentOrder}
                disabled={loading}
                className={`w-full mt-6 py-4 px-6 rounded-2xl font-bold text-white transition duration-200 flex items-center justify-center gap-3 text-lg shadow-lg ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:scale-95 shadow-green-300"
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Scoring Your Order...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Pay Now
                  </>
                )}
              </button>}


              <p className="text-center text-xs text-gray-500 mt-3">
                ⚽ Gear up for victory! Your order will be processed securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
