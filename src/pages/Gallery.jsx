"use client";
import React, { useState } from "react";
import {
  FaBook,
  FaCrown,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
  FaUser,
} from "react-icons/fa";

const initialLiveData = [
  { id: 1, user: "Mem***9FO", amount: "₹2,400.00", game: "Vegas Nights" },
  { id: 2, user: "Mem***FU6", amount: "₹1,500.00", game: "Baccarat Supreme" },
  { id: 3, user: "Mem***LPA", amount: "₹5,250.00", game: "Treasures of Aztec" },
];

const initialTopEarners = [
  { id: 1, name: "Mem****21M", amount: "₹7,142,199.30", color: "yellow" },
  { id: 2, name: "Mem****MYM", amount: "₹7,104,483.85", color: "gray" },
  { id: 3, name: "Mem****74A", amount: "₹7,032,469.04", color: "orange" },
];

const colorMap = {
  yellow: "text-yellow-400",
  gray: "text-gray-400",
  orange: "text-orange-400",
};

export default function LiveAndGalleryCMS() {
  const [liveData, setLiveData] = useState(initialLiveData);
  const [topEarners, setTopEarners] = useState(initialTopEarners);
  const [editingLiveId, setEditingLiveId] = useState(null);
  const [editingTopId, setEditingTopId] = useState(null);
  const [newLive, setNewLive] = useState({ user: "", amount: "", game: "" });
  const [newTop, setNewTop] = useState({ name: "", amount: "", color: "yellow" });

  // === Handlers ===
  const handleLiveChange = (id, field, value) =>
    setLiveData((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));

  const handleTopChange = (id, field, value) =>
    setTopEarners((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));

  const handleDeleteLive = (id) => setLiveData((prev) => prev.filter((item) => item.id !== id));
  const handleDeleteTop = (id) => setTopEarners((prev) => prev.filter((item) => item.id !== id));

  const handleAddLive = () => {
    if (!newLive.user || !newLive.amount || !newLive.game) return alert("Please fill all live fields!");
    setLiveData((prev) => [...prev, { ...newLive, id: prev.length + 1 }]);
    setNewLive({ user: "", amount: "", game: "" });
  };

  const handleAddTop = () => {
    if (!newTop.name || !newTop.amount) return alert("Please fill all top earner fields!");
    setTopEarners((prev) => [...prev, { ...newTop, id: prev.length + 1 }]);
    setNewTop({ name: "", amount: "", color: "yellow" });
  };

  return (
    <section className="min-h-screen bg-white text-white py-12 px-6 md:pl-60 flex justify-center">
      <div className="w-full max-w-6xl bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-700 p-8 sm:p-12">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Live & Top Earners CMS - BG678
        </h2>

        {/* === LIVE WINNING FEED === */}
        <div className="mb-12">
          <h3 className="flex items-center justify-center text-xl font-semibold mb-4 gap-2">
            <FaBook className="text-red-500" /> Live Winning Feed
          </h3>

          <table className="w-full text-sm border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Game</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {liveData.map((item) => (
                <tr key={item.id} className="bg-gray-900 hover:bg-gray-800 transition">
                  <td className="p-2 border">
                    {editingLiveId === item.id ? (
                      <input
                        type="text"
                        value={item.user}
                        onChange={(e) => handleLiveChange(item.id, "user", e.target.value)}
                        className="bg-gray-800 rounded p-1 text-white w-full"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-400" /> {item.user}
                      </div>
                    )}
                  </td>
                  <td className="p-2 border text-yellow-400 font-semibold">
                    {editingLiveId === item.id ? (
                      <input
                        type="text"
                        value={item.amount}
                        onChange={(e) => handleLiveChange(item.id, "amount", e.target.value)}
                        className="bg-gray-800 rounded p-1 text-yellow-400 w-full"
                      />
                    ) : (
                      item.amount
                    )}
                  </td>
                  <td className="p-2 border">
                    {editingLiveId === item.id ? (
                      <input
                        type="text"
                        value={item.game}
                        onChange={(e) => handleLiveChange(item.id, "game", e.target.value)}
                        className="bg-gray-800 rounded p-1 text-white w-full"
                      />
                    ) : (
                      item.game
                    )}
                  </td>
                  <td className="p-2 border text-center flex justify-center gap-2">
                    {editingLiveId === item.id ? (
                      <>
                        <button onClick={() => setEditingLiveId(null)} className="text-green-500 hover:text-green-400">
                          <FaSave />
                        </button>
                        <button onClick={() => setEditingLiveId(null)} className="text-gray-400 hover:text-gray-300">
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setEditingLiveId(item.id)} className="text-yellow-400 hover:text-yellow-300">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeleteLive(item.id)} className="text-red-500 hover:text-red-400">
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}

              {/* Add Row */}
              <tr className="bg-gray-900">
                <td className="p-2 border">
                  <input
                    placeholder="User"
                    value={newLive.user}
                    onChange={(e) => setNewLive({ ...newLive, user: e.target.value })}
                    className="bg-gray-800 rounded p-1 text-white w-full"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    placeholder="Amount"
                    value={newLive.amount}
                    onChange={(e) => setNewLive({ ...newLive, amount: e.target.value })}
                    className="bg-gray-800 rounded p-1 text-yellow-400 w-full"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    placeholder="Game"
                    value={newLive.game}
                    onChange={(e) => setNewLive({ ...newLive, game: e.target.value })}
                    className="bg-gray-800 rounded p-1 text-white w-full"
                  />
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={handleAddLive}
                    className="bg-red-600 hover:bg-red-700 rounded p-2 text-sm font-semibold flex items-center justify-center gap-1 mx-auto"
                  >
                    <FaPlus /> Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* === TOP EARNERS === */}
        <div>
          <h3 className="flex items-center justify-center text-xl font-semibold mb-4 gap-2">
            <FaCrown className="text-red-500" /> Today's Top Earners
          </h3>

          <table className="w-full text-sm border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Color</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {topEarners.map((earner) => (
                <tr key={earner.id} className="bg-gray-900 hover:bg-gray-800 transition">
                  <td className="p-2 border">
                    {editingTopId === earner.id ? (
                      <input
                        type="text"
                        value={earner.name}
                        onChange={(e) => handleTopChange(earner.id, "name", e.target.value)}
                        className="bg-gray-800 rounded p-1 text-white w-full"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-400" /> {earner.name}
                      </div>
                    )}
                  </td>
                  <td className="p-2 border text-yellow-400 font-semibold">
                    {editingTopId === earner.id ? (
                      <input
                        type="text"
                        value={earner.amount}
                        onChange={(e) => handleTopChange(earner.id, "amount", e.target.value)}
                        className="bg-gray-800 rounded p-1 text-yellow-400 w-full"
                      />
                    ) : (
                      earner.amount
                    )}
                  </td>
                  <td className="p-2 border">
                    {editingTopId === earner.id ? (
                      <select
                        value={earner.color}
                        onChange={(e) => handleTopChange(earner.id, "color", e.target.value)}
                        className="bg-gray-800 rounded p-1 text-white w-full"
                      >
                        <option value="yellow">Yellow</option>
                        <option value="gray">Gray</option>
                        <option value="orange">Orange</option>
                      </select>
                    ) : (
                      <span className={colorMap[earner.color]}>{earner.color}</span>
                    )}
                  </td>
                  <td className="p-2 border text-center flex justify-center gap-2">
                    {editingTopId === earner.id ? (
                      <>
                        <button onClick={() => setEditingTopId(null)} className="text-green-500 hover:text-green-400">
                          <FaSave />
                        </button>
                        <button onClick={() => setEditingTopId(null)} className="text-gray-400 hover:text-gray-300">
                          <FaTimes />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => setEditingTopId(earner.id)} className="text-yellow-400 hover:text-yellow-300">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDeleteTop(earner.id)} className="text-red-500 hover:text-red-400">
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}

              {/* Add Row */}
              <tr className="bg-gray-900">
                <td className="p-2 border">
                  <input
                    placeholder="Name"
                    value={newTop.name}
                    onChange={(e) => setNewTop({ ...newTop, name: e.target.value })}
                    className="bg-gray-800 rounded p-1 text-white w-full"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    placeholder="Amount"
                    value={newTop.amount}
                    onChange={(e) => setNewTop({ ...newTop, amount: e.target.value })}
                    className="bg-gray-800 rounded p-1 text-yellow-400 w-full"
                  />
                </td>
                <td className="p-2 border">
                  <select
                    value={newTop.color}
                    onChange={(e) => setNewTop({ ...newTop, color: e.target.value })}
                    className="bg-gray-800 rounded p-1 text-white w-full"
                  >
                    <option value="yellow">Yellow</option>
                    <option value="gray">Gray</option>
                    <option value="orange">Orange</option>
                  </select>
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={handleAddTop}
                    className="bg-red-600 hover:bg-red-700 rounded p-2 text-sm font-semibold flex items-center justify-center gap-1 mx-auto"
                  >
                    <FaPlus /> Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-10">
          © 2025 BG678 Admin Panel
        </p>
      </div>
    </section>
  );
}
