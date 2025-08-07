import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Login = ({ role }) => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
 const { isAuthenticated, user } = useSelector((store) => store.user);

   if (isAuthenticated) {
    if (role === "Admin" && user?.role === "admin") {
      return <Navigate to="/admin/overview" replace />;
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
      console.log(res.data.user.role);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {role === "Admin" ? " Admin Login" : "Sign In"}
        </h2>
        <form className="space-y-5 " onSubmit={handleLogin}>
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              value={emailId}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              value={password}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
