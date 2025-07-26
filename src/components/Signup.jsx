import axios from "axios";
import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
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
            <label className="text-sm font-semibold text-gray-700">
              FirstName
            </label>
            <input
              value={firstName}
              type="text"
              placeholder="Enter your Name"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
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
