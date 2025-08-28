import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartCountSlice";
import { ArrowUpDown, Filter, X } from "lucide-react";

const categories = ["jersey", "boots", "glove", "shinguard", "shorts", "football"];
const brands = ["adidas", "puma", "nike", "reebok", "cosco", "nivia"];

const ViewAllProducts = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredProducts =
    selectedCategories.length === 0
      ? products
      : products.filter((p) => selectedCategories.includes(p.category));

  const filteredBrands =
    selectedBrands.length === 0
      ? filteredProducts
      : filteredProducts.filter((p) => selectedBrands.includes(p.brand));

  const sortProduct = [...filteredBrands].sort((a, b) => {
    if (sortOption === "LowtoHigh") return a.price - b.price;
    if (sortOption === "HightoLow") return b.price - a.price;
    if (sortOption === "TitleAZ") return a.title.localeCompare(b.title);
    if (sortOption === "TitleZA") return b.title.localeCompare(a.title);
    return 0;
  });

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

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const detailedProduct = (id) => {
    navigate(`/productdetails/${id}`);
  };

  const handleCart = async (e, product) => {
    e.stopPropagation();
    try {
      const res = await axios.post(
        BASE_URL + "addToCart/" + product._id,
        {},
        { withCredentials: true }
      );

      dispatch(addItem({ ...product, count: 1 }));
      toast.success("Item added to Cart", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.log(err);

      dispatch(addItem({ ...product, count: 1 }));
      toast.success("Item added to Cart", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  };

  const getActiveFiltersCount = () => {
    return selectedCategories.length + selectedBrands.length;
  };

  // Filter sidebar component for reuse
  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'w-full' : 'w-52'} flex-col gap-6 p-4 rounded-lg shadow-md bg-gray-50 ${isMobile ? 'max-h-[70vh] overflow-y-auto' : 'sticky top-20 h-fit self-start'}`}>
      {isMobile && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Filters</h2>
          <button
            onClick={() => setShowMobileFilters(false)}
            className="p-1 hover:bg-gray-200 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Clear filters button */}
      {getActiveFiltersCount() > 0 && (
        <button
          onClick={clearAllFilters}
          className="w-full text-sm text-red-600 hover:text-red-700 hover:bg-red-50 py-2 rounded-lg transition-colors"
        >
          Clear All Filters ({getActiveFiltersCount()})
        </button>
      )}

      {/* Categories */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
          Categories
        </h3>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat);
            return (
              <label
                key={cat}
                className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 ${
                  isChecked
                    ? "bg-green-100 border border-green-300 text-green-700"
                    : "bg-white text-gray-700 hover:bg-green-50 border border-transparent"
                }`}
              >
                <input
                  type="checkbox"
                  name="category"
                  value={cat}
                  checked={isChecked}
                  onChange={() => toggleCategory(cat)}
                  className="hidden"
                />
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
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
                <span className="text-sm">
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      <div className="flex flex-col gap-2 md:mt-5">
        <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
          Brands
        </h3>
        <div className="space-y-1">
          {brands.map((brand) => {
            const isChecked = selectedBrands.includes(brand);
            return (
              <label
                key={brand}
                className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 ${
                  isChecked
                    ? "bg-green-100 border border-green-300 text-green-700"
                    : "bg-white text-gray-700 hover:bg-green-50 border border-transparent"
                }`}
              >
                <input
                  type="checkbox"
                  name="brand"
                  value={brand}
                  checked={isChecked}
                  onChange={() => toggleBrand(brand)}
                  className="hidden"
                />
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
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
                <span className="text-sm">
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="shadow-sm mb-4 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mt-4 sm:mt-6 mb-2 sm:mb-3 text-gray-800 tracking-wide">
          Explore Our Collection
        </h1>
        <p className="text-center text-gray-500 text-sm sm:text-base mb-4">
          Shop the latest jerseys, boots, gloves, and more... 🏆
        </p>

        {/* Mobile controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 my-4">
          {/* Mobile filter button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors w-full sm:w-auto justify-center"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">
              Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            </span>
          </button>

          {/* Sort dropdown */}
          <div className="relative inline-block w-full sm:w-auto">
            <select
              className="w-full sm:w-auto px-4 py-2 text-sm border border-gray-300 rounded-xl shadow-sm 
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

      <main className="flex-1 px-4 sm:px-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden md:flex">
            <FilterSidebar />
          </div>

          {/* Mobile Filter Overlay */}
          {showMobileFilters && (
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex">
              <div className="bg-white w-full max-w-sm ml-auto">
                <FilterSidebar isMobile={true} />
              </div>
              <div 
                className="flex-1" 
                onClick={() => setShowMobileFilters(false)}
              ></div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {/* Active filters display */}
            {getActiveFiltersCount() > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                  >
                    {cat}
                    <button
                      onClick={() => toggleCategory(cat)}
                      className="hover:bg-green-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedBrands.map((brand) => (
                  <span
                    key={brand}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                  >
                    {brand}
                    <button
                      onClick={() => toggleBrand(brand)}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 mb-10">
              {sortProduct.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => detailedProduct(product._id)}
                >
                  <div className="aspect-square p-3 sm:p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h2 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 mb-2">
                      {product.title}
                    </h2>
                    <p className="text-green-600 font-bold text-lg mb-3">
                      ₹{product.price}
                    </p>
                    <button
                      className="w-full bg-green-600 text-white py-2 px-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base"
                      onClick={(e) => handleCart(e, product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}

              {/* No products message */}
              {sortProduct.length === 0 && (
                <div className="text-center col-span-full mt-10 py-12">
                  <div className="text-6xl mb-4">🚫</div>
                  <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                    No products found
                  </p>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Try adjusting your filters or sorting options.
                  </p>
                  {getActiveFiltersCount() > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewAllProducts;