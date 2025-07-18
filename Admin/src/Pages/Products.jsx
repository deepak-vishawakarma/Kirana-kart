import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [editData, setEditData] = useState(null);

  // Fetch categories and products
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  async function fetchCategories() {
    const res = await axios.get("https://kirana-kart.onrender.com/api/Categories/data");
    setCategories(res.data);
  }

  async function fetchProducts() {
    const res = await axios.get("https://kirana-kart.onrender.com/api/product/data");
    setProducts(res.data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ProductName", e.target.ProductName.value);
    formData.append("image", e.target.ProductPhoto.files[0]);
    formData.append("ProductDetails", e.target.ProductDetails.value);
    formData.append("ProductDiscriptions", e.target.ProductDiscriptions.value);
    formData.append("ProductReating", e.target.ProductReating.value);
    formData.append("ProductPrice", e.target.ProductPrice.value);
    formData.append("ProductCetagorie", e.target.ProductCetagorie.value);

    await axios.post("https://kirana-kart.onrender.com/api/product/data", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    fetchProducts();
    e.target.reset();
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ProductName", e.target.ProductName.value);
    formData.append("ProductDetails", e.target.ProductDetails.value);
    formData.append("ProductDiscriptions", e.target.ProductDiscriptions.value);
    formData.append("ProductReating", e.target.ProductReating.value);
    formData.append("ProductPrice", e.target.ProductPrice.value);
    formData.append("ProductCetagorie", e.target.ProductCetagorie.value);

    const imageInput = e.target.ProductPhoto;
    if (imageInput && imageInput.files[0]) {
      formData.append("image", imageInput.files[0]);
    }

    await axios.put(
      `https://kirana-kart.onrender.com/api/product/data/${editData._id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    setEditData(null);
    fetchProducts();
  }

  async function handleDelete(id) {
    await axios.delete(`https://kirana-kart.onrender.com/api/product/data/${id}`);
    fetchProducts();
  }

  return (
    <div className="ml-64 w-[calc(100%-16rem)] min-h-screen px-4 py-6 bg-gradient-to-br from-fuchsia-100 to-pink-200">
      <form
        onSubmit={handleAdd}
        className="max-w-2xl mx-auto bg-white p-6 rounded shadow flex flex-col gap-3"
      >
        <h2 className="text-xl font-bold text-center text-fuchsia-600">Add Product</h2>
        <input name="ProductName" placeholder="Product Name" required className="border p-2 rounded" />
        <input type="file" name="ProductPhoto" required className="border p-2 rounded" />
        <input name="ProductDetails" placeholder="Product Details" required className="border p-2 rounded" />
        <input name="ProductDiscriptions" placeholder="Description" required className="border p-2 rounded" />
        <input name="ProductReating" placeholder="Rating" required className="border p-2 rounded" />
        <input name="ProductPrice" placeholder="Price" required className="border p-2 rounded" />
        <select name="ProductCetagorie" required className="border p-2 rounded">
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.CategorieName}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Product</button>
      </form>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6">
        {products.map((item) => (
          <div key={item._id} className="bg-white border rounded shadow p-3">
            <h3 className="text-lg font-bold">{item.ProductName}</h3>
            <img src={item.ProductPhoto} alt="Product" className="w-full h-32 object-cover rounded" />
            <p>{item.ProductDetails}</p>
            <p>{item.ProductDiscriptions}</p>
            <p>Rating: {item.ProductReating}</p>
            <p>Price:{item.ProductPrice}</p>
            <p>Category: {item.ProductCetagorie.map((e) => e.CategorieName).join(", ")}</p>

            <div className="flex justify-between gap-2 mt-2">
              <Popup
                trigger={<button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Edit</button>}
                modal
                onOpen={() => setEditData(item)}
              >
                {(close) => (
                  <form onSubmit={(e) => { handleUpdate(e); close(); }} className="flex flex-col gap-3 p-4">
                    <h3 className="text-lg font-bold">Edit Product</h3>
                    <input name="ProductName" defaultValue={item.ProductName} required className="border p-2 rounded" />
                    <input type="file" name="ProductPhoto" className="border p-2 rounded" />
                    <input name="ProductDetails" defaultValue={item.ProductDetails} required className="border p-2 rounded" />
                    <input name="ProductDiscriptions" defaultValue={item.ProductDiscriptions} required className="border p-2 rounded" />
                    <input name="ProductReating" defaultValue={item.ProductReating} required className="border p-2 rounded" />
                    <input name="ProductPrice" defaultValue={item.ProductPrice} required className="border p-2 rounded" />
                    <select name="ProductCetagorie" defaultValue={item.ProductCetagorie[0]?._id} required className="border p-2 rounded">
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.CategorieName}</option>
                      ))}
                    </select>
                    <div className="flex justify-between">
                      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Update</button>
                      <button type="button" onClick={close} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
                    </div>
                  </form>
                )}
              </Popup>
              <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
