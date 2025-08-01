import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'

const Profile = () => {
      const [data,setData]=useState([])
    const profileData=async()=>{
        try{
         const res=await axios.get(BASE_URL+"profile",{withCredentials:true})
         console.log(res.data.data)
         setData(res.data.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        profileData()
    },[])
  return (
    <div>
      {data.map((profile)=>(
        <div>
         <h1>{profile.firstName}</h1>
         <h1>lstName</h1>
         <h3>gender</h3>
        </div>
        ))}
    </div>
  )
}

export default Profile