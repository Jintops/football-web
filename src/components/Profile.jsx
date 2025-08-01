import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';

const Profile = () => {
  const [data, setData] = useState(null);

  const profileData = async () => {
    try {
      const res = await axios.get(BASE_URL + 'profile', { withCredentials: true });
      console.log(res.data.data);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    profileData();
  }, []);

  if (!data) return <p className="text-center text-gray-500 mt-10">No profile found</p>;

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
