import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await axios.get("https://kirana-kart.onrender.com/api/Categories/data");
    setCategories(res.data);
  }

  async function handleAdd(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("CategorieName", e.target.name.value);
    formData.append("image", e.target.image.files[0]);
    formData.append("CategorieDiscriptions", e.target.desc.value);

    await axios.post("https://kirana-kart.onrender.com/api/Categories/data", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    fetchData();
    e.target.reset();
  }

  async function handleUpdate(e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("CategorieName", e.target.name.value);

  const imageInput = e.target.image;
  if (imageInput && imageInput.files[0]) {
    formData.append("image", imageInput.files[0]); // 🔄 Must match backend multer field
  }

  formData.append("CategorieDiscriptions", e.target.desc.value); // 🔄 Must match textarea name

  await axios.put(`https://kirana-kart.onrender.com/api/Categories/data/${editData._id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  setEditData(null);
  fetchData();
}


  async function handleDelete(id) {
    await axios.delete(`https://kirana-kart.onrender.com/api/Categories/data/${id}`);
    fetchData();
  }

  return (
    <div className="ml-64 w-[calc(100%-16rem)] min-h-screen px-4 py-6 bg-gradient-to-br from-fuchsia-100 to-pink-200">
      <form
        onSubmit={handleAdd}
        className="max-w-2xl mx-auto flex flex-col gap-3 bg-white p-6 rounded shadow mb-6"
      >
        <h2 className="text-xl font-bold text-center text-fuchsia-600">
          Add Category
        </h2>
        <input
          name="name"
          placeholder="Category Name"
          required
          className="border p-2 rounded"
        />
        <input type="file" name="image" className="border p-2 rounded" />
        <textarea
          name="desc"
          placeholder="Description"
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white border rounded shadow p-3 flex flex-col gap-2"
          >
            <h3 className="text-lg font-bold">{cat.CategorieName}</h3>
            <img
              src={cat.CategoriePoster}
              alt="poster"
              className="w-full h-32 object-cover rounded"
            />
            <p className="text-sm">{cat.CategorieDiscriptions}</p>
            <div className="flex justify-between gap-2">
              <Popup
                trigger={<button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"> Edit </button>} modal onOpen={() => setEditData(cat)}>
                {(close) => (
                  <form
                    onSubmit={(e) => {
                      handleUpdate(e);
                      close();
                    }}
                    className="flex flex-col gap-3 p-4"
                  >
                    <h3 className="text-lg font-bold">Edit Category</h3>
                    <input
                      name="name"
                      defaultValue={cat.CategorieName}
                      className="border p-2 rounded"
                      required
                    />
                    <input type="file" name="image" className="border p-2 rounded" />

                    <textarea name="desc" defaultValue={cat.CategorieDiscriptions} className="border p-2 rounded" required />

                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={close}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </Popup>
              <button
                onClick={() => handleDelete(cat._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
