import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'

const Profile = () => {
      const [data,setData]=useState()
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

    if (!data || data.length === 0) return <p>No profile found</p>
 return (
  <div>
    
    
      <div>
        <h1>{data.firstName}</h1>
        <h1>{data.lastName}</h1>
        <h3>{data.gender}</h3>
      </div>
  
  </div>
);
}

export default Profile