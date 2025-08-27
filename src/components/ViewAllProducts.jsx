import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartCountSlice";
import { ArrowUpDown } from "lucide-react";

const categories = ["jersey", "boots", "glove", "shinguard", "shorts","football"];

const ViewAllProducts = () => {
  const [selectedCategories, setSelectedCategories] = useState([]); // array
  const [products, setProducts] = useState([]);
  const [sortOption,setSortOption]=useState("")

const dispatch=useDispatch()

 const navigate=useNavigate();

  const filteredProducts =
    selectedCategories.length === 0 
      ? products
      : products.filter((p) => selectedCategories.includes(p.category));



      const sortProduct=[...filteredProducts].sort((a,b)=>{
        if(sortOption==="LowtoHigh") return a.price-b.price;
        if(sortOption==="HightoLow") return b.price-a.price;
        if(sortOption==="TitleAZ") return a.title.localeCompare(b.title);
        if(sortOption==="TitleZA") return b.title.localeCompare(a.title);
        return 0
      })

const combinedProduct=filteredProducts&&sortProduct

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

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const detailedProduct=(id)=>{
    navigate(`/productdetails/${id}`)
  }

  const handleCart=async(e,product)=>{
    e.stopPropagation();
    try{
        const res=await axios.post(BASE_URL+"addToCart/"+product._id,{},{withCredentials:true})
        
        dispatch(addItem({...product,count:1}))
        toast.success("Item added to Cart",{
            position:"bottom-right",
            autoClose:3000
        })
    }catch(err){
        console.log(err)

        dispatch(addItem({...product,count:1}))
          toast.success('Item added to Cart',{
            position:"bottom-right",
            autoClose:3000,
          })
    }
  }


  return (
    <div className="flex flex-col min-h-screen">
         <div className="shadow-sm mb-6">
    <h1 className="text-4xl font-extrabold text-center mt-6 mb-3 text-gray-800 tracking-wide">
      Explore Our Collection
    </h1>
    <p className="text-center text-gray-500 ">
      Shop the latest jerseys, boots, gloves, and more... 🏆
    </p>
      <div className="flex justify-end my-4 mx-6 ">
    <div className="relative inline-block">
      <select
        className="px-4 py-2 text-sm border border-gray-300 rounded-xl shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 
                   appearance-none pr-10"
        onChange={(e) => setSortOption(e.target.value)}
        defaultValue=""
      >
        <option value="">Sort by</option>
        <option value="LowtoHigh">Price: Low → High</option>
        <option value="HightoLow">Price: High → Low</option>
        <option value="TitleAZ">Title: A → Z</option>
        <option value="TitleZA">Title: Z → A</option>
      </select>
      <ArrowUpDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
  </div>
  </div>

      <main className="flex-1">
    
        <div className="flex gap-6">
            
          {/* Sidebar */}
         <div className="w-52 flex flex-col gap-4 p-4 rounded-lg shadow-md sticky top-20 h-fit self-start bg-gray-50">
  <h1 className="font-bold text-center text-gray-800">Categories</h1>
  {categories.map((cat) => {
    const isChecked = selectedCategories.includes(cat);
    return (
      <label
        key={cat}
        className={`flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg transition ${
          isChecked
            ? "border border-green-300"
            : "bg-white text-gray-700 hover:bg-green-100 "
        }`}
      >
        {/* Hidden Checkbox */}
        <input
          type="checkbox"
          name="category"
          value={cat}
          checked={isChecked}
          onChange={() => toggleCategory(cat)}
          className="hidden"
        />

        {/* Custom Checkbox UI */}
        <span
          className={`w-5 h-5 rounded-md border flex items-center justify-center ${
            isChecked ? "bg-green-500 border-green-600" : "border-gray-400"
          }`}
        >
          {isChecked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8.25 8.25a1 1 0 01-1.414 0l-4.25-4.25a1 1 0 111.414-1.414L8 12.586l7.543-7.543a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>

        {/* Label Text */}
        <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
      </label>
    );
  })}
</div>


          {/* Product Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10"
          >
            {combinedProduct.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden hover:scale-105 transition-transform duration-500"
               onClick={()=>detailedProduct(product._id)} >
                <figure className="px-6 pt-6 flex justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-xl h-60 w-60 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </figure>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h2>
                  <p className="text-green-600 font-bold mt-2">
                    ₹{product.price}
                  </p>
                  <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
                  onClick={(e)=>handleCart(e,product)}>
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
