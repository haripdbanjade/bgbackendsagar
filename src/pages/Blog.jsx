import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function Blog() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Top 5 Upcoming Action Games of 2025",
      desc: "Get ready for adrenaline! Here's a sneak peek at the most awaited action games launching next year.",
      date: "2025-10-12",
      image: "/images/5.jpg",
    },
    {
      id: 2,
      title: "How to Build a Gaming PC on a Budget",
      desc: "Build your dream rig without breaking the bank. Tips and component recommendations for every budget.",
      date: "2025-10-04",
      image: "/images/2.jpg",
    },
  ]);

  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ title: "", desc: "", image: "" });

  const startAdd = () => {
    setEdit("add");
    setForm({ title: "", desc: "", image: "" });
  };

  const startEdit = (b) => {
    setEdit(b.id);
    setForm({ title: b.title, desc: b.desc, image: b.image });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const save = () => {
    if (!form.title || !form.desc) {
      alert("Please fill in all fields");
      return;
    }

    const currentDate = new Date().toISOString().slice(0, 10);

    if (edit === "add") {
      setBlogs([
        {
          id: Date.now(),
          title: form.title,
          desc: form.desc,
          image: form.image,
          date: currentDate,
        },
        ...blogs,
      ]);
    } else {
      setBlogs(
        blogs.map((b) =>
          b.id === edit ? { ...b, ...form, date: currentDate } : b
        )
      );
    }

    setEdit(null);
  };

  const del = (id) => setBlogs(blogs.filter((b) => b.id !== id));

  return (
    <section className="min-h-screen bg-white py-12 px-6 md:pl-60 flex justify-center text-white">
      <div className="w-full max-w-6xl bg-slate-800 rounded-3xl shadow-2xl border border-gray-700 p-8 sm:p-12">
        <header className="flex justify-between mb-6 items-center">
          <h1 className="text-2xl font-bold text-white">BG678 News</h1>
          <button
            onClick={startAdd}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold transition duration-200"
          >
            Add New
          </button>
        </header>

        {/* Add/Edit Form */}
        {edit && (
          <div className="mb-4 border p-4 rounded bg-slate-700 text-white">
            <input
              className="border p-2 w-full mb-2 text-black rounded"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              className="border p-2 w-full mb-2 text-black rounded"
              placeholder="Description"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-2"
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="w-64 h-32 object-cover rounded mb-2 border"
              />
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEdit(null)}
                className="px-4 py-1 border rounded text-white hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Blog Table */}
        <table className="w-full border-collapse border border-gray-600 text-white">
          <thead>
            <tr className="bg-slate-700">
              <th className="border border-gray-600 px-4 py-2">Image</th>
              <th className="border border-gray-600 px-4 py-2">Title</th>
              <th className="border border-gray-600 px-4 py-2">Description</th>
              <th className="border border-gray-600 px-4 py-2">Date</th>
              <th className="border border-gray-600 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b, index) => (
              <tr
                key={b.id}
                className={`text-center align-top ${
                  index % 2 === 0 ? "bg-slate-800" : "bg-slate-700"
                }`}
              >
                <td className="border border-gray-600 p-2">
                  {b.image ? (
                    <img
                      src={b.image}
                      alt={b.title}
                      className="w-24 h-16 object-cover mx-auto rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border border-gray-600 px-4 py-2">{b.title}</td>
                <td className="border border-gray-600 px-4 py-2 text-left">
                  {b.desc}
                </td>
                <td className="border border-gray-600 px-4 py-2">{b.date}</td>
                <td className="border border-gray-600 px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => startEdit(b)}
                    className="flex items-center gap-1 px-4 py-1 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition duration-200"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => del(b.id)}
                    className="flex items-center gap-1 px-4 py-1 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-200"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-400">
                  No blog posts available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
