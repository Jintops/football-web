import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { X } from 'lucide-react';

const AddProduct = ({ onClose, onProductAdded,selectedProduct }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); 
  const [previewUrl, setPreviewUrl] = useState(null);
   
  
  useEffect(() => {
    if (selectedProduct) {
      setTitle(selectedProduct.title || '');
      setDescription(selectedProduct.description || '');
      setPrice(selectedProduct.price || '');
      setCategory(selectedProduct.category || '')
      setPreviewUrl(selectedProduct.image || null); 
    }
  }, [selectedProduct]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddProduct = async () => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image); // This must match 'upload.single("image")' in backend
  let res;
    if(selectedProduct){
         res = await axios.put(BASE_URL + "editProduct/"+selectedProduct._id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    }else{
     res = await axios.post(BASE_URL + "addProduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
}
    if (onProductAdded) onProductAdded(res.data.data);
    onClose();
  } catch (err) {
    console.error("Product creation failed:", err);
  }
};

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed top-0 right-0 h-full w-full sm:w-[60%] md:w-[45%] lg:w-[35%] xl:w-[25%] bg-white shadow-lg z-50 rounded-l-2xl flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-100">
          <h1 className="text-xl font-bold text-gray-800">{selectedProduct ? "Edit Product" : "Add Product"}</h1>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-gray-900" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product title"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div> 

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full px-4 py-2 border rounded-md resize-none h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>


        <div>
  <label className="text-sm font-medium text-gray-700 mb-1 block">
    Category
  </label>
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
  >
    <option value="">Select Category</option>
    <option value="jersey">Jersey</option>
    <option value="boots">Boots</option>
    <option value="glove">Glove</option>
    <option value="shinguard">Shin Guard</option>
    <option value="shorts">Shorts</option>
  </select>
</div>



          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:rounded file:text-sm file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-3 h-40 w-full object-cover rounded-md border"
              />
            )}
          </div>

          <button
            className="mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition text-center font-semibold"
            onClick={handleAddProduct}
          >
           {selectedProduct ? "Edit Product" : "Add Product"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
