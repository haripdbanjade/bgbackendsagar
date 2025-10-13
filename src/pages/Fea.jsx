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

  // small helper component to render dynamic icon components safely
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
    <section className="bg-[#0b0e15] text-white p-6 min-h-screen max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Features CMS</h2>

      {/* Form */}
      <form
        onSubmit={saveFeature}
        className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6"
      >
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="p-2 rounded bg-gray-800 border"
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="p-2 rounded bg-gray-800 border"
        />

        {/* Custom Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 bg-gray-800 p-2 w-full rounded border"
          >
            <RenderIcon Icon={form.icon} className="text-red-500" />
            {form.icon?.name}
          </button>
          {showDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-gray-900 border rounded shadow-lg max-h-48 overflow-y-auto">
              {initialFeatures.map((f, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setForm({ ...form, icon: f.icon });
                    setShowDropdown(false);
                  }}
                  className="flex items-center gap-2 w-full p-2 hover:bg-gray-700"
                >
                  <RenderIcon Icon={f.icon} className="text-red-500" />
                  {f.icon?.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 rounded p-2"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full text-sm border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 border">Icon</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {features.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-400">
                No features
              </td>
            </tr>
          )}
          {features.map((f, i) => (
            <tr key={i} className="bg-gray-900">
              <td className="p-2 border">
                <RenderIcon Icon={f.icon} className="text-red-500" />
              </td>
              <td className="p-2 border">{f.title}</td>
              <td className="p-2 border">{f.description}</td>
              <td className="p-2 border flex gap-2 justify-center">
                <button
                  onClick={() => {
                    setForm({ ...f });
                    setEditIndex(i);
                  }}
                  className="text-blue-400"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() =>
                    setFeatures(features.filter((_, idx) => idx !== i))
                  }
                  className="text-red-400"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
