import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import AddProduct from "./AddProduct";

const AdminProducts = () => {
  const [product, setProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState(null);
 const [openAddProduct,setOpenAddProduct]=useState(false)

  const getAllProducts = async () => {
    try {
      const res = await axios.get(BASE_URL + "getAllProducts", {
        withCredentials: true,
      });
      setProduct(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (item) => {
    setProductId(item);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await axios.delete(
        `${BASE_URL}deleteProduct/${productId._id}`,
        {
          withCredentials: true,
        }
      );

      
      setProduct((prev) => prev.filter((item) => item._id !== productId._id));

      setShowModal(false);
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="p-6">
<div className="flex justify-between items-center mb-6">
  <h1 className="font-bold text-3xl text-green-700">
    📦 Products List
  </h1>
  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold shadow"
   onClick={()=>setOpenAddProduct(true)}>
    + Add Product
  </button>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {product.map((item) => (
          <div
            className="bg-white rounded-xl shadow-md border p-4 hover:shadow-lg transition"
            key={item._id}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-52 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {item.title}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-2 mb-2">
              {item.description}
            </p>
            <h4 className="text-xl font-bold text-green-600 mb-3">
              ₹{item.price}
            </h4>
            <div className="flex justify-between">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                <Pencil className="w-4 h-4" />
                Edit
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                onClick={() => handleDelete(item)}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Are you sure want to delete{" "}
              <span className="text-black">'{productId.title}'</span>?
            </h2>

            <p className="text-gray-700 mb-6">This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setShowModal(false)}
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
       {openAddProduct && <AddProduct onClose={() => setOpenAddProduct(false)} /> }
    </div>
  );
};

export default AdminProducts;
