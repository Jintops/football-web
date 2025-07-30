import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { Pencil, Trash2 } from "lucide-react";
const AdminListOfUsers = () => {

  const [users,setUsers]=useState([])
   const [openModal,setOpenModal]=useState(false)
    const [deleteUser,setDeleteUser]=useState(null)
const getAllUsers=async()=>{
    try{
        const res=await axios.get(BASE_URL+"getAllUsers",{withCredentials:true})
        setUsers(res.data.data)
        console.log(res.data.data)
    }catch(err){
        console.log(err)
    }
}

    useEffect(()=>{
     getAllUsers();
    },[])

    const handleDelete=(user)=>{
     setOpenModal(true)
     setDeleteUser(user)
     
    }

    const confirmDelete=async()=>{
    const res=await axios.delete(BASE_URL+"deleteUser/"+deleteUser._id,{withCredentials:true})
    setUsers((prev)=>prev.filter((user)=>user._id!==deleteUser._id))
    setOpenModal(false)
    }

  return (
    <div>
        {users.map((user)=>(
        <div className='flex justify-around border items-center m-2' key={user._id}>
           
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s'></img>
           <div className='flex flex-col'>
            <h1>{user.firstName}</h1>
            <h2>{user.gender}</h2>
            <h2>{user.emailId}</h2>
            <h2>{user.phone}</h2>
            </div>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                onClick={() => handleDelete(user)}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
        </div>
        ))}

        {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Are you sure want to delete{" "}
              <span className="text-black">'{deleteUser.firstName}'</span>?
            </h2>

            <p className="text-gray-700 mb-6">This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminListOfUsers