import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function GameCMS() {
  const [games, setGames] = useState([
    { id: 1, name: "Treasures of Aztec", earning: "₹150000", image: "/images/Aztecz.jpg" },
    { id: 2, name: "SevenSevenSeven", earning: "₹200000", image: "/images/77.jpg" },
    { id: 3, name: "Teen Patti", earning: "₹95000", image: "/images/tin.jpg" },
  ]);

  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", earning: "", image: "" });

  const resetForm = () => {
    setForm({ name: "", earning: "", image: "" });
    setEditId(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const { name, earning, image } = form;
    if (!name.trim() || !earning.trim() || !image) {
      alert("All fields are required!");
      return;
    }

    const newGame = { id: editId || Date.now(), name: name.trim(), earning: earning.trim(), image };

    if (editId) setGames((prev) => prev.map((g) => (g.id === editId ? newGame : g)));
    else setGames((prev) => [newGame, ...prev]);

    resetForm();
  };

  const handleEdit = (game) => {
    setForm({ name: game.name, earning: game.earning, image: game.image });
    setEditId(game.id);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this game?")) {
      setGames((prev) => prev.filter((g) => g.id !== id));
      if (editId === id) resetForm();
    }
  };

  const sortedGames = [...games].sort((a, b) => {
    const numA = parseInt(a.earning.replace(/[₹,]/g, ""));
    const numB = parseInt(b.earning.replace(/[₹,]/g, ""));
    return numB - numA;
  });

  return (
    <section className="min-h-screen bg-white  text-white py-12 px-6 md:pl-60 flex justify-center">
      <div className="w-full max-w-6xl bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-700 p-8 sm:p-12">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-500 text-center sm:text-left">
            Game CMS
          </h1>
          <button
            onClick={resetForm}
            className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded w-full sm:w-auto font-semibold"
          >
            Add New Game
          </button>
        </header>

        {/* Form */}
        <div className="bg-gray-900 p-4 rounded mb-6 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              className="p-2 rounded bg-gray-800 text-white w-full"
              placeholder="Game Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              className="p-2 rounded bg-gray-800 text-white w-full"
              placeholder="Earning (e.g. ₹120000)"
              value={form.earning}
              onChange={(e) => setForm({ ...form, earning: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              className="p-2 bg-gray-800 text-white w-full"
              onChange={handleImageChange}
            />
          </div>

          {form.image && (
            <div className="flex justify-center sm:justify-start mt-4">
              <img
                src={form.image}
                alt="Preview"
                className="w-40 h-24 object-cover rounded border border-gray-700"
              />
            </div>
          )}

          <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
            {editId && (
              <button
                onClick={resetForm}
                className="px-4 py-2 border border-gray-600 rounded text-white hover:bg-gray-800 transition w-full sm:w-auto font-semibold"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 transition text-white rounded w-full sm:w-auto font-semibold"
            >
              {editId ? "Update Game" : "Save Game"}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-700 rounded text-sm sm:text-base">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="p-2 border border-gray-700">Image</th>
                <th className="p-2 border border-gray-700">Name</th>
                <th className="p-2 border border-gray-700">Earning</th>
                <th className="p-2 border border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedGames.length > 0 ? (
                sortedGames.map((game) => (
                  <tr key={game.id} className="hover:bg-gray-800 transition-colors">
                    <td className="p-2 border border-gray-700">
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-16 h-12 sm:w-20 sm:h-14 object-cover rounded"
                      />
                    </td>
                    <td className="p-2 border border-gray-700">{game.name}</td>
                    <td className="p-2 border border-gray-700">{game.earning}</td>
                    <td className="p-2 border border-gray-700 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(game)}
                        className="flex items-center gap-1 px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition duration-200"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(game.id)}
                        className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-200"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500 text-sm sm:text-base">
                    No games available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
