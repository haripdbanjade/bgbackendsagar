"use client";
import { useState } from "react";
import { features as initialFeatures } from "../data/fea";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function FeatureTableCMS() {
  const [features, setFeatures] = useState(initialFeatures);
  const [form, setForm] = useState({
    title: "",
    description: "",
    icon: initialFeatures[0].icon,
  });
  const [editIndex, setEditIndex] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const RenderIcon = ({ Icon, className }) => {
    if (!Icon) return null;
    return <Icon className={className} />;
  };

  const saveFeature = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.icon) return;

    const updated = [...features];
    if (editIndex !== null) {
      updated[editIndex] = form;
    } else {
      updated.push(form);
    }

    setFeatures(updated);
    setForm({ title: "", description: "", icon: initialFeatures[0].icon });
    setEditIndex(null);
    setShowDropdown(false);
  };

  return (
    <section className="min-h-screen bg-white text-white py-12 px-6 md:pl-60 flex justify-center">
      <div className="w-full max-w-6xl bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-700 p-8 sm:p-12">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-white">
          ✨ Manage Features
        </h2>

        {/* Form */}
        <form
          onSubmit={saveFeature}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10"
        >
          <input
            placeholder="Feature Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-3 rounded-xl bg-[#1e293b] border border-slate-600 focus:ring-2 focus:ring-red-500 focus:outline-none text-white placeholder-gray-400"
          />
          <input
            placeholder="Feature Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-3 rounded-xl bg-[#1e293b] border border-slate-600 focus:ring-2 focus:ring-red-500 focus:outline-none text-white placeholder-gray-400"
          />

          {/* Dropdown for Icon Selection */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center justify-between gap-2 bg-[#1e293b] p-3 w-full rounded-xl border border-slate-600 text-white hover:border-red-500 transition"
            >
              <div className="flex items-center gap-2">
                <RenderIcon Icon={form.icon} className="text-red-500 text-lg" />
                <span>{form.icon?.name}</span>
              </div>
              <span className="text-gray-400">▼</span>
            </button>
            {showDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-[#0f172a] border border-slate-700 rounded-xl shadow-xl max-h-52 overflow-y-auto">
                {initialFeatures.map((f, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setForm({ ...form, icon: f.icon });
                      setShowDropdown(false);
                    }}
                    className="flex items-center gap-3 w-full p-3 hover:bg-[#1e293b] transition text-left"
                  >
                    <RenderIcon Icon={f.icon} className="text-red-500 text-lg" />
                    <span className="text-white">{f.icon?.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 rounded-xl p-3 font-semibold shadow-md transition"
          >
            {editIndex !== null ? "Update Feature" : "Add Feature"}
          </button>
        </form>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-700 shadow-lg">
          <table className="w-full text-sm">
            <thead className="bg-[#1e293b] text-slate-200 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-4 text-left">Icon</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {features.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-slate-400 bg-[#0f172a]"
                  >
                    No features added yet.
                  </td>
                </tr>
              )}
              {features.map((f, i) => (
                <tr
                  key={i}
                  className="bg-[#0f172a] hover:bg-[#1e293b] border-t border-slate-700 transition"
                >
                  <td className="p-4">
                    <RenderIcon Icon={f.icon} className="text-red-500 text-lg" />
                  </td>
                  <td className="p-4 font-medium">{f.title}</td>
                  <td className="p-4 text-slate-400">{f.description}</td>
                  <td className="p-4 flex gap-4 justify-center">
                    <button
                      onClick={() => {
                        setForm({ ...f });
                        setEditIndex(i);
                      }}
                      className="text-blue-400 hover:text-blue-500 transition"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() =>
                        setFeatures(features.filter((_, idx) => idx !== i))
                      }
                      className="text-red-400 hover:text-red-500 transition"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
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
