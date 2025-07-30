import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { Trash2 } from 'lucide-react';

const AdminListOfUsers = () => {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(BASE_URL + 'getAllUsers', { withCredentials: true });
      setUsers(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (user) => {
    setOpenModal(true);
    setDeleteUser(user);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(BASE_URL + 'deleteUser/' + deleteUser._id, { withCredentials: true });
      setUsers((prev) => prev.filter((user) => user._id !== deleteUser._id));
      setOpenModal(false);
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 text-gray-800">All Users</h1>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="w-full flex items-center justify-between border p-4 rounded-lg shadow-sm bg-white"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.photoUrl || `https://ui-avatars.com/api/?name=${user.firstName}`}
                alt={user.firstName}
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div className="flex flex-col text-sm">
                <span className="font-semibold text-gray-800">{user.firstName}</span>
                <span className="text-gray-500">{user.emailId}</span>
                <span className="text-gray-500">Gender: {user.gender}</span>
                <span className="text-gray-500">Phone: {user.phone}</span>
              </div>
            </div>

            <button
              onClick={() => handleDelete(user)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-2">Confirm Delete</h2>
            <p className="mb-4">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-black">{deleteUser?.firstName}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminListOfUsers;
