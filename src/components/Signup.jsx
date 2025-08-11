import axios from "axios";
import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff, Mail, Lock, User, Shield, LogIn } from "lucide-react";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); 
   const [showPassword,setShowPassword]=useState(false)
  const navigate = useNavigate();

  const handleSignUP = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:7777/signup",
        { firstName, emailId, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Signup successful!", {
          position: "bottom-right",
          autoClose: 2000,
        });
        navigate("/");
      } else {
        toast.error(res.data.message || "Signup failed", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form className="space-y-5" onSubmit={handleSignUP}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2 text-green-600"/>
              FirstName
            </label>
            <div className="relative">
            <input
              value={firstName}
              type="text"
              placeholder="Enter your Name"
              className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 bg-gray-50 group-hover:bg-white"
              onChange={(e) => setFirstName(e.target.value)}
            />
             <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"/>
             </div>
          </div>
          <div className="relative group">
                       <label className="block text-sm font-bold text-gray-700 mb-2">
                         <Mail className="w-4 h-4 inline mr-2 text-green-600" />
                         Email Address
                       </label>
                       <div className="relative">
                         <input
                           type="email"
                           value={emailId}
                           onChange={(e) => {
                             setEmailId(e.target.value);
                             setError("");
                           }}
                           placeholder="Enter your email"
                           className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 bg-gray-50 group-hover:bg-white"
                           required
                         />
                         <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                       </div>
                     </div>
         
                     {/* Password Field */}
                     <div className="relative group">
                       <label className="block text-sm font-bold text-gray-700 mb-2">
                         <Lock className="w-4 h-4 inline mr-2 text-green-600" />
                         Password
                       </label>
                       <div className="relative">
                         <input
                           type={showPassword ? "text" : "password"}
                           value={password}
                           onChange={(e) => {
                             setPassword(e.target.value);
                             setError("");
                           }}
                           placeholder="Enter your password"
                           className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 bg-gray-50 group-hover:bg-white"
                           required
                         />
                         <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                         <button
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition duration-200"
                         >
                           {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                         </button>
                       </div>
                     </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
