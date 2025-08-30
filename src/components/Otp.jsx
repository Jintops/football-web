import React, { useEffect, useRef, useState } from 'react'

const OTP_COUNT = 4;

const Otp = () => {
  const [inputArr, setInputArr] = useState(new Array(OTP_COUNT).fill(""));
  const inputRef = useRef([]);

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
                             hover:bg-green-700 transition-all shadow-md">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
