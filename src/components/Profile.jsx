import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import { UserX } from 'lucide-react';
const Profile = () => {
  const [data, setData] = useState(null);

  const profileData = async () => {
    try {
      const res = await axios.get(BASE_URL + 'profile', { withCredentials: true });
     
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    profileData();
  }, []);
if (!data) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center">
        <UserX className="w-14 h-14 text-red-500 mb-4" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">Profile Not Found</h2>
        <p className="text-gray-600 text-center mb-4 max-w-md">
          We couldn't find your profile. Please log in to access your account and view your profile information.
        </p>
        <Link to="/login">
          <button className="w-full sm:w-48 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
}

  return (
    <div className="h-screen ">
        <div className='max-w-md mx-auto mt-10 bg-white border shadow-lg rounded-xl p-6 space-y-4'>
      <div className="flex items-center space-x-4">
        <img
          src={data?.photoUrl || 'https://via.placeholder.com/80'}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-green-500 object-cover"
        />
        <div>
          <h1 className="text-xl font-bold text-gray-800">{data.firstName} {data.lastName}</h1>
          <p className="text-sm text-gray-500 capitalize">Gender: {data.gender}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p className="text-sm text-gray-600">Email</p>
          <p className="font-medium">{data.email || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Phone</p>
          <p className="font-medium">{data.phone || 'N/A'}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
