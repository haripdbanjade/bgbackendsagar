"use client";
import { useState } from "react";
import { features as initialFeatures } from "../data/fea";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function FeatureTableCMS() {
  const [features, setFeatures] = useState(initialFeatures);
  const [form, setForm] = useState({ title: "", description: "", icon: initialFeatures[0].icon });
  const [editIndex, setEditIndex] = useState(null);

  const saveFeature = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;

    const updated = [...features];
    if (editIndex !== null) updated[editIndex] = form;
    else updated.push(form);

    setFeatures(updated);
    setForm({ title: "", description: "", icon: initialFeatures[0].icon });
    setEditIndex(null);
  };

  return (
    <section className="bg-[#0b0e15] text-white p-6 min-h-screen max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Features CMS</h2>

      <form onSubmit={saveFeature} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6">
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="p-2 rounded bg-gray-800 border" />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="p-2 rounded bg-gray-800 border" />
        <select value={form.icon.name} onChange={e => {
          const icon = initialFeatures.find(f => f.icon.name === e.target.value)?.icon;
          if (icon) setForm({ ...form, icon });
        }} className="p-2 rounded bg-gray-800 border">
          {initialFeatures.map((f, i) => <option key={i} value={f.icon.name}>{f.icon.name}</option>)}
        </select>
        <button type="submit" className="bg-green-600 rounded"> {editIndex !== null ? "Update" : "Add"} </button>
      </form>

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
          {features.length === 0 && <tr><td colSpan={4} className="p-4 text-center text-gray-400">No features</td></tr>}
          {features.map((f, i) => (
            <tr key={i} className="bg-gray-900">
              <td className="p-2 border"><f.icon className="text-red-500" /></td>
              <td className="p-2 border">{f.title}</td>
              <td className="p-2 border">{f.description}</td>
              <td className="p-2 border flex gap-2 justify-center">
                <button onClick={() => { setForm(f); setEditIndex(i); }} className="text-blue-400"><FaEdit /></button>
                <button onClick={() => setFeatures(features.filter((_, idx) => idx !== i))} className="text-red-400"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
