import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import { UserX, Edit2, Save, X, User } from 'lucide-react';

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');

  const profileData = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get(BASE_URL + 'profile', { withCredentials: true });
      setData(res.data.data);
      
      // Initialize form fields when data is loaded
      setFirstName(res.data.data?.firstName || '');
      setLastName(res.data.data?.lastName || '');
      setGender(res.data.data?.gender || '');
    } catch (err) {
      console.log(err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = async () => {
    if (!firstName.trim()) {
      setError('First name and last name are required');
      return;
    }

    try {
      setEditLoading(true);
      setError('');
      const res = await axios.put(
        BASE_URL + "profile/edit",
        { firstName: firstName.trim(), lastName: lastName.trim(), gender },
        { withCredentials: true }
      );
      
      await profileData(); // Refresh profile data
      setOpenEdit(false);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setEditLoading(false);
    }
  };
  console.log(data)
  const handleCancelEdit = () => {
    // Reset form to original values
    setFirstName(data?.firstName || '');
    setLastName(data?.lastName || '');
    setGender(data?.gender || '');
    setOpenEdit(false);
    setError('');
  };

  useEffect(() => {
    profileData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
        <div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center max-w-md w-full">
          <UserX className="w-14 h-14 text-red-500 mb-4" />
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2 text-center">Profile Not Found</h2>
          <p className="text-gray-600 text-center mb-6">
            We couldn't find your profile. Please log in to access your account and view your profile information.
          </p>
          <Link to="/login" className="w-full">
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition duration-200">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className='max-w-2xl mx-auto space-y-6'>
        {/* Profile Card */}
        <div className='bg-white border shadow-lg rounded-xl p-6'>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            {!openEdit && (
              <button 
                className='flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 border border-green-600 rounded-lg text-white font-medium transition duration-200' 
                onClick={() => setOpenEdit(true)}
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            )}
          </div>

          <div className="flex items-center space-x-6 mb-6">
            <div className="relative">
              <img
                src={data?.photoUrl || 'https://via.placeholder.com/100'}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-green-500 object-cover"
              />
              {!data?.photoUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full border-4 border-green-500">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-gray-800">{data.firstName} {data.lastName}</h2>
              <p className="text-gray-600 capitalize">{data.gender || 'Not specified'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Email</p>
              <p className="text-gray-800">{data.emailId || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">Phone</p>
              <p className="text-gray-800">{data.phone || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {openEdit && (
          <div className='bg-white border shadow-lg rounded-xl p-6'>
            <div className="flex items-center justify-between mb-6">
              <h2 className='text-2xl font-bold text-gray-800'>Edit Profile</h2>
              <button
                onClick={handleCancelEdit}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition duration-200"
              >
                <X size={20} />
              </button>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            <div className='space-y-4'>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input 
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent' 
                    value={firstName} 
                    type='text' 
                    placeholder="Enter first name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input 
                    className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent' 
                    value={lastName} 
                    type='text' 
                    placeholder="Enter last name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select 
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent' 
                  value={gender} 
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition duration-200 ${
                    editLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                  onClick={handleEditProfile}
                  disabled={editLoading}
                >
                  <Save size={16} />
                  {editLoading ? 'Saving...' : 'Save Changes'}
                </button>
                
                <button 
                  className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition duration-200'
                  onClick={handleCancelEdit}
                  disabled={editLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;