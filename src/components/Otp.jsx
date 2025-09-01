import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const OTP_COUNT = 4;

const Otp = () => {
  const [inputArr, setInputArr] = useState(new Array(OTP_COUNT).fill(""));
  const inputRef = useRef([]);
  const dispatch=useDispatch()
const navigate=useNavigate()

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const handleInput = (value, index) => {
    if (isNaN(value)) return;
    const newValue = value.trim();
    const newArr = [...inputArr];
    newArr[index] = newValue.slice(-1);
    setInputArr(newArr);
    newValue && inputRef.current[index + 1]?.focus();
  };

  const handleKey = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      inputRef.current[index - 1]?.focus();
    }
  };

  const { state } = useLocation();
 
  const userId=state?.userId

  const handleOtpVerify=async()=>{
    const otpvalue=inputArr.join('')
    try{   
     const res=await axios.post(BASE_URL+"verify-otp",{userId:userId, otp:otpvalue},{withCredentials:true})
      if (res.data.success) {
        toast.success("Signup successfull", {
          position: "bottom-right",
          autoClose: 2000,
        });
        navigate("/");
        dispatch(addUser(res.data.data))
      } else {
        toast.error(res.data.message || "Signup failed", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
  }catch(err){
    console.log(err)
  }
  }


  const handleResendOtp=async()=>{
    try{
      const res=await axios.post(BASE_URL+"resend-otp",{userId},{withCredentials:true})
      
      if(res.data.success){
         toast.success("Resend otp success", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }else {
        toast.error(res.data.message || "Resend otp failed", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    }catch(err){
        console.log(err)
    }
  }
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Verify OTP
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Please enter the 4-digit code sent to your email.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-4">
          {inputArr.map((input, index) => (
            <input
              type="text"
              key={index}
              ref={(el) => (inputRef.current[index] = el)}
              value={inputArr[index]}
              className="w-14 h-14 text-center border-2 border-gray-300 rounded-xl 
                         text-xl font-semibold focus:outline-none focus:border-green-500 
                         shadow-sm transition-all"
              onChange={(e) => handleInput(e.target.value, index)}
              onKeyDown={(e) => handleKey(e, index)}
            />
          ))}
        </div>

        {/* Button */}
        <div className="mt-8 text-center">
          <button className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl 
                             hover:bg-green-700 transition-all shadow-md" onClick={handleOtpVerify}>
            Verify
          </button>
        </div>
        <h3 className='text-center mt-5 text-lg underline cursor-pointer text-gray-700' onClick={handleResendOtp}>resend otp</h3>
      </div>
    </div>
  );
};

export default Otp;
