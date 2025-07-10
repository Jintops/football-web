import React, { useState } from "react";

const CartProduct = ({ item }) => {
  const { name, image, price } = item;
  const [count, setCount] = useState(1);

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="w-full px-2">
      <div className="flex flex-wrap md:flex-nowrap m-4 items-center bg-gray-50 p-4 rounded-lg gap-4 justify-between">
        <img
          className="w-20 h-20 object-cover rounded-lg"
          src={image}
          alt={name}
        />

        <div className="flex flex-col flex-grow min-w-0">
          <h1 className="line-clamp-2 text-sm sm:text-base font-semibold">
            {name}
          </h1>
          <h2 className="text-gray-700">${price}</h2>

          <div className="flex gap-4 items-center mt-2">
            <span
              onClick={decrement}
              className="text-xl font-bold cursor-pointer"
            >
              -
            </span>
            <h1>{count}</h1>
            <span
              onClick={() => setCount(count + 1)}
              className="text-xl font-bold cursor-pointer"
            >
              +
            </span>
          </div>
        </div>

        <div className="font-bold ml-auto md:ml-0 text-sm sm:text-base">
          ${(price * count).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
