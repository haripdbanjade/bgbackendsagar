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

  const handleLiveChange = (id, field, value) => {
    setLiveData((old) =>
      old.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleTopChange = (id, field, value) => {
    setTopEarners((old) =>
      old.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDeleteLive = (id) =>
    setLiveData((old) => old.filter((item) => item.id !== id));
  const handleDeleteTop = (id) =>
    setTopEarners((old) => old.filter((item) => item.id !== id));

  const handleAddLive = () => {
    if (!newLive.user || !newLive.amount || !newLive.game)
      return alert("Fill all live fields!");
    setLiveData((old) => [...old, { ...newLive, id: old.length + 1 }]);
    setNewLive({ user: "", amount: "", game: "" });
  };

  const handleAddTop = () => {
    if (!newTop.name || !newTop.amount)
      return alert("Fill all top earner fields!");
    setTopEarners((old) => [...old, { ...newTop, id: old.length + 1 }]);
    setNewTop({ name: "", amount: "", color: "yellow" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 md:pl-60">
      <section className="w-full max-w-5xl rounded-lg bg-[#1a1f2e] text-white shadow-2xl p-4 sm:p-6 overflow-x-auto">
        {/* Live Winning Feed */}
        <div className="mb-10">
          <h2 className="flex flex-wrap items-center justify-center text-xl sm:text-2xl font-bold mb-4 gap-2 text-center">
            <FaBook className="text-red-500" />
            Live Winning Feed
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="border-b border-gray-700 text-gray-300">
                  <th className="py-2">User</th>
                  <th>Amount</th>
                  <th>Game</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {liveData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-800 hover:bg-[#242a3d] transition-all"
                  >
                    <td className="py-2 flex items-center gap-2">
                      <FaUser className="text-gray-400" />
                      {editingLiveId === item.id ? (
                        <input
                          type="text"
                          value={item.user}
                          onChange={(e) =>
                            handleLiveChange(item.id, "user", e.target.value)
                          }
                          className="bg-[#2a2f4a] rounded p-1 text-white text-xs sm:text-sm w-full"
                        />
                      ) : (
                        item.user
                      )}
                    </td>
                    <td>
                      {editingLiveId === item.id ? (
                        <input
                          type="text"
                          value={item.amount}
                          onChange={(e) =>
                            handleLiveChange(item.id, "amount", e.target.value)
                          }
                          className="bg-[#2a2f4a] rounded p-1 text-yellow-400 font-semibold text-xs sm:text-sm w-full"
                        />
                      ) : (
                        <span className="text-yellow-400 font-semibold">
                          {item.amount}
                        </span>
                      )}
                    </td>
                    <td>
                      {editingLiveId === item.id ? (
                        <input
                          type="text"
                          value={item.game}
                          onChange={(e) =>
                            handleLiveChange(item.id, "game", e.target.value)
                          }
                          className="bg-[#2a2f4a] rounded p-1 text-white text-xs sm:text-sm w-full"
                        />
                      ) : (
                        item.game
                      )}
                    </td>
                    <td className="py-2 text-center">
                      <div className="flex justify-center items-center gap-2 sm:gap-3">
                        {editingLiveId === item.id ? (
                          <>
                            <button
                              onClick={() => setEditingLiveId(null)}
                              className="text-green-500 hover:text-green-400"
                              title="Save"
                            >
                              <FaSave />
                            </button>
                            <button
                              onClick={() => setEditingLiveId(null)}
                              className="text-gray-400 hover:text-gray-300"
                              title="Cancel"
                            >
                              <FaTimes />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => setEditingLiveId(item.id)}
                              className="text-yellow-400 hover:text-yellow-300"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteLive(item.id)}
                              className="text-red-600 hover:text-red-500"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td>
                    <input
                      type="text"
                      placeholder="User"
                      value={newLive.user}
                      onChange={(e) =>
                        setNewLive({ ...newLive, user: e.target.value })
                      }
                      className="bg-[#2a2f4a] rounded p-1 text-white text-xs sm:text-sm w-full"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Amount"
                      value={newLive.amount}
                      onChange={(e) =>
                        setNewLive({ ...newLive, amount: e.target.value })
                      }
                      className="bg-[#2a2f4a] rounded p-1 text-yellow-400 font-semibold text-xs sm:text-sm w-full"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Game"
                      value={newLive.game}
                      onChange={(e) =>
                        setNewLive({ ...newLive, game: e.target.value })
                      }
                      className="bg-[#2a2f4a] rounded p-1 text-white text-xs sm:text-sm w-full"
                    />
                  </td>
                  <td className="text-center">
                    <button
                      onClick={handleAddLive}
                      className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 rounded py-1 px-2 sm:px-3 text-xs sm:text-sm font-semibold mx-auto"
                    >
                      <FaPlus /> Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Earners */}
        <div>
          <h2 className="flex flex-wrap items-center justify-center text-xl sm:text-2xl font-bold mb-4 gap-2 text-center">
            <FaCrown className="text-red-500" />
            Today's Top Earners
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="border-b border-gray-700 text-gray-300">
                  <th className="py-2">Name</th>
                  <th>Amount</th>
                  <th>Color</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topEarners.map((earner) => (
                  <tr
                    key={earner.id}
                    className="border-b border-gray-800 hover:bg-[#242a3d] transition-all"
                  >
                    <td>
                      {editingTopId === earner.id ? (
                        <input
                          type="text"
                          value={earner.name}
                          onChange={(e) =>
                            handleTopChange(earner.id, "name", e.target.value)
                          }
                          className="bg-[#2a2f4a] rounded p-1 text-white text-xs sm:text-sm w-full"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <FaUser className="text-gray-400" />
                          {earner.name}
                        </div>
                      )}
                    </td>
                    <td>
                      {editingTopId === earner.id ? (
                        <input
                          type="text"
                          value={earner.amount}
                          onChange={(e) =>
                            handleTopChange(earner.id, "amount", e.target.value)
                          }
                          className="bg-[#2a2f4a] rounded p-1 text-yellow-400 font-semibold text-xs sm:text-sm w-full"
                        />
                      ) : (
                        <span className="text-yellow-400 font-semibold">
                          {earner.amount}
                        </span>
                      )}
                    </td>
                    <td>
                      {editingTopId === earner.id ? (
                        <select
                          value={earner.color}
                          onChange={(e) =>
                            handleTopChange(earner.id, "color", e.target.value)
                          }
                          className="bg-[#2a2f4a] rounded p-1 text-white text-xs sm:text-sm w-full"
                        >
                          <option value="yellow">Yellow</option>
                          <option value="gray">Gray</option>
                          <option value="orange">Orange</option>
                        </select>
                      ) : (
                        <span className={colorMap[earner.color]}>
                          {earner.color}
                        </span>
                      )}
                    </td>
                    <td className="py-2 text-center">
                      <div className="flex justify-center items-center gap-2 sm:gap-3">
                        {editingTopId === earner.id ? (
                          <>
                            <button
                              onClick={() => setEditingTopId(null)}
                              className="text-green-500 hover:text-green-400"
                              title="Save"
                            >
                              <FaSave />
                            </button>
                            <button
                              onClick={() => setEditingTopId(null)}
                              className="text-gray-400 hover:text-gray-300"
                              title="Cancel"
                            >
                              <FaTimes />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => setEditingTopId(earner.id)}
                              className="text-yellow-400 hover:text-yellow-300"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteTop(earner.id)}
                              className="text-red-600 hover:text-red-500"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td>
                    <input
                      type="text"
                      placeholder="Name"
                      value={newTop.name}
                      onChange={(e) =>
                        setNewTop({ ...newTop, name: e.target.value })
                      }
                      className="bg-[#2a2f4a] rounded p-1 text-white text-xs sm:text-sm w-full"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Amount"
                      value={newTop.amount}
                      onChange={(e) =>
                        setNewTop({ ...newTop, amount: e.target.value })
                      }
                      className="bg-[#2a2f4a] rounded p-1 text-yellow-400 font-semibold text-xs sm:text-sm w-full"
                    />
                  </td>
                  <td>
                    <select
                      value={newTop.color}
                      onChange={(e) =>
                        setNewTop({ ...newTop, color: e.target.value })
                      }
                      className="bg-[#2a2f4a] rounded p-1 text-white text-xs sm:text-sm w-full"
                    >
                      <option value="yellow">Yellow</option>
                      <option value="gray">Gray</option>
                      <option value="orange">Orange</option>
                    </select>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={handleAddTop}
                      className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 rounded py-1 px-2 sm:px-3 text-xs sm:text-sm font-semibold mx-auto"
                    >
                      <FaPlus /> Add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
