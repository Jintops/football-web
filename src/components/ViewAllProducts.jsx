import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const categories = ["All", "jersey", "boots", "glove", "shinguard", "shorts"];

const ViewAllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const allProducts = async () => {
    try {
      const res = await axios.get(BASE_URL + "getAllProducts", {
        withCredentials: true,
      });
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    allProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Content */}
      <main className="flex-1">
        <h1 className="text-3xl font-bold text-center m-8 text-gray-800">
          Our Products
        </h1>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-52 flex flex-col gap-4  p-4 rounded-lg shadow-md sticky top-20 h-fit self-start">
            <h1 className="font-bold text-center">Categories</h1>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-md font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-green-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden hover:scale-105 transition-transform duration-500"
              >
                <figure className="px-6 pt-6 flex justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-xl h-60 w-60 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </figure>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-green-600 font-bold mt-2">
                    ₹{product.price}
                  </p>
                  <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}

            {/* If no products */}
            {filteredProducts.length === 0 && (
              <p className="text-center text-gray-500 mt-10 col-span-full">
                No products available in this category.
              </p>
            )}
          </div>
        </div>
      </main>

  
    </div>
  );
};

export default ViewAllProducts;
