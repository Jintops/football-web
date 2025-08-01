import React from 'react';
import { LayoutDashboard, ShoppingBag, Users, PackageSearch, LogOut } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const DashBoard = () => {

    const handleLogout=async()=>{
       const res=await axios.post(BASE_URL+"logout",{},{withCredentials:true})
    }
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-center text-green-600">Admin Panel</h1>
        </div>
        <ul className="p-4 space-y-4 text-gray-700">
         <Link to='/admin/overview'><li className="flex items-center gap-3 cursor-pointer hover:text-green-600 hover:bg-gray-100 pt-2">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </li></Link>

         <Link to='/admin/products'> <li className="flex items-center gap-3 cursor-pointer pt-4 hover:text-green-600 hover:bg-gray-100">
            <ShoppingBag className="w-5 h-5" />
            Products
          </li></Link> 

         <Link to='/admin/orderlist'> <li className="flex items-center gap-3 cursor-pointer pt-4 hover:text-green-600 hover:bg-gray-100">
            <PackageSearch className="w-5 h-5" />
            Orders
          </li></Link>
         <Link to='/admin/userlist'> <li className="flex items-center gap-3 cursor-pointer pt-4 hover:text-green-600 hover:bg-gray-100">
            <Users className="w-5 h-5" />
            Users
          </li></Link>
          <Link to='/admin/login'><li className="flex items-center gap-3 cursor-pointer hover:text-red-500 mt-10" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
            Logout
          </li></Link>
        </ul>
      </div>
    <div className="flex-1 p-6">
        <Outlet/>
      </div>
    </div>
  );
};

export default DashBoard;
