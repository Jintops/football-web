import React from 'react';
import { LayoutDashboard, ShoppingBag, Users, PackageSearch, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashBoard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-center text-green-600">Admin Panel</h1>
        </div>
        <ul className="p-4 space-y-4 text-gray-700">
         <li className="flex items-center gap-3 cursor-pointer hover:text-green-600 hover:bg-gray-100 pt-2">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </li>

         <Link to='/adminproducts'> <li className="flex items-center gap-3 cursor-pointer pt-2 hover:text-green-600 hover:bg-gray-100">
            <ShoppingBag className="w-5 h-5" />
            Products
          </li></Link> 

         <Link to='/adminorderlist'> <li className="flex items-center gap-3 cursor-pointer pt-2 hover:text-green-600 hover:bg-gray-100">
            <PackageSearch className="w-5 h-5" />
            Orders
          </li></Link>
         <Link to='/adminuserlist'> <li className="flex items-center gap-3 cursor-pointer pt-2 hover:text-green-600 hover:bg-gray-100">
            <Users className="w-5 h-5" />
            Users
          </li></Link>
          <li className="flex items-center gap-3 cursor-pointer hover:text-red-500 mt-10">
            <LogOut className="w-5 h-5" />
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-500">Welcome back, Admin!</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Total Products</h3>
            <p className="text-2xl font-bold">120</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Total Orders</h3>
            <p className="text-2xl font-bold">450</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Total Users</h3>
            <p className="text-2xl font-bold">320</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold">$15,240</p>
          </div>
        </div>

        {/* Placeholder Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
            <p className="text-gray-500">[Order Table Placeholder]</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-4">Top Selling Products</h3>
            <p className="text-gray-500">[Product List Placeholder]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
