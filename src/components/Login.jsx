import React from 'react'
import { Link } from 'react-router-dom'

const Login = ({role}) => {
  return (
   <div className="flex items-center justify-center min-h-screen ">
  <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md border border-gray-100">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
    <form className="space-y-5">
      <div>
        <label className="text-sm font-semibold text-gray-700">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-gray-700">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition duration-300"
      >
        Sign In
      </button>
    </form>
    {role!=="Admin" &&
    <p className="mt-6 text-sm text-center text-gray-600">
      Don't have an account?<Link to="/signup"  className="text-green-600 hover:underline">Sign up</Link>
    </p>}
  </div>
</div>

  )
}

export default Login