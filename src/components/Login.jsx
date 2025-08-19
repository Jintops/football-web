import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { Eye, EyeOff, Mail, Lock, User, Shield, LogIn } from "lucide-react";
const Login = ({ role }) => {
  const [emailId, setEmailId] = useState("jps2003@gmail.com");
  const [password, setPassword] = useState("Jinto@2003");
  const [showPassword,setShowPassword]=useState(false)
  const [errorr,setErrorr]=useState('')
  const location = useLocation();
  const navigate = useNavigate();
 const { isAuthenticated, user } = useSelector((store) => store.user);

   if (isAuthenticated) {
    if (role === "Admin" && user?.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (role === "User" && user?.role === "user") {
      return <Navigate to="/" replace />;
    }
  }

  const from = location.state?.from?.pathname || "/";
const product = location.state?.from?.state?.product;
const cartItem = location.state?.from?.state?.cartItem;
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "http://localhost:7777/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      
      if (res.data.user.role === "admin") {
        navigate("/admin/overview", { replace: true });
      } else {
        // If coming from a protected route like /orders, go back to it
      navigate(from !== "/" ? from : "/", {
  replace: true,
  state: { product, cartItem },  // ⬅️ send the original state back
});
      }
     
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setErrorr(err.response.data.message)
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {role === "Admin" ? " Admin Login" : "Sign In"}
        </h2>
        <form className="space-y-5 " onSubmit={handleLogin}>
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
          {errorr&&<p className="text-red-600 font-medium">{errorr} !!</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            {role === "Admin" ? "Login as Admin" : "Sign In"}
          </button>
        </form>
        {role !== "Admin" && (
          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?
            <Link to="/signup" className="text-green-600 hover:underline">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
