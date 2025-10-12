import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from "react-icons/fa";

const initialFeaturesA = [
  { id: 1, title: "Feature A1", description: "Description A1" },
  { id: 2, title: "Feature A2", description: "Description A2" },
];

const initialFeaturesB = [
  { id: 1, title: "Feature B1", description: "Description B1" },
  { id: 2, title: "Feature B2", description: "Description B2" },
];

export default function TwoFeatureTables() {
  const [featuresA, setFeaturesA] = useState(initialFeaturesA);
  const [featuresB, setFeaturesB] = useState(initialFeaturesB);

  const [editingA, setEditingA] = useState(null);
  const [editingB, setEditingB] = useState(null);

  const [showAddA, setShowAddA] = useState(false);
  const [showAddB, setShowAddB] = useState(false);

  const [newFeatureA, setNewFeatureA] = useState({ title: "", description: "" });
  const [newFeatureB, setNewFeatureB] = useState({ title: "", description: "" });

  const [editFormA, setEditFormA] = useState({ title: "", description: "" });
  const [editFormB, setEditFormB] = useState({ title: "", description: "" });

  // Delete handlers
  const handleDeleteA = (id) => {
    setFeaturesA(featuresA.filter(f => f.id !== id));
    if (editingA === id) setEditingA(null);
  };
  const handleDeleteB = (id) => {
    setFeaturesB(featuresB.filter(f => f.id !== id));
    if (editingB === id) setEditingB(null);
  };

  // Start edit
  const startEditA = (feature) => {
    setEditingA(feature.id);
    setEditFormA({ title: feature.title, description: feature.description });
  };
  const startEditB = (feature) => {
    setEditingB(feature.id);
    setEditFormB({ title: feature.title, description: feature.description });
  };

  // Cancel edit
  const cancelEditA = () => setEditingA(null);
  const cancelEditB = () => setEditingB(null);

  // Save edit
  const saveEditA = (id) => {
    if (!editFormA.title.trim() || !editFormA.description.trim()) {
      alert("Fill all fields");
      return;
    }
    setFeaturesA(featuresA.map(f => f.id === id ? { ...f, ...editFormA } : f));
    setEditingA(null);
  };
  const saveEditB = (id) => {
    if (!editFormB.title.trim() || !editFormB.description.trim()) {
      alert("Fill all fields");
      return;
    }
    setFeaturesB(featuresB.map(f => f.id === id ? { ...f, ...editFormB } : f));
    setEditingB(null);
  };

  // Add new feature
  const addFeatureA = () => {
    if (!newFeatureA.title.trim() || !newFeatureA.description.trim()) {
      alert("Fill all fields");
      return;
    }
    setFeaturesA([...featuresA, { ...newFeatureA, id: Date.now() }]);
    setNewFeatureA({ title: "", description: "" });
    setShowAddA(false);
  };
  const addFeatureB = () => {
    if (!newFeatureB.title.trim() || !newFeatureB.description.trim()) {
      alert("Fill all fields");
      return;
    }
    setFeaturesB([...featuresB, { ...newFeatureB, id: Date.now() }]);
    setNewFeatureB({ title: "", description: "" });
    setShowAddB(false);
  };

  // Render rows for a table
  const renderRows = (features, editingId, editForm, setEditForm, startEdit, cancelEdit, saveEdit, handleDelete) => {
    return features.map(feature => {
      if (editingId === feature.id) {
        return (
          <tr key={feature.id} className="bg-gray-800">
            <td className="border px-3 py-2">{feature.id}</td>
            <td className="border px-3 py-2">
              <input
                type="text"
                value={editForm.title}
                onChange={e => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-gray-900 text-white px-2 py-1 rounded border border-gray-700"
              />
            </td>
            <td className="border px-3 py-2">
              <input
                type="text"
                value={editForm.description}
                onChange={e => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-gray-900 text-white px-2 py-1 rounded border border-gray-700"
              />
            </td>
            <td className="border px-3 py-2 flex gap-2 justify-center">
              <button
                onClick={() => saveEdit(feature.id)}
                className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 text-white flex items-center gap-1"
                title="Save"
              >
                <FaSave />
              </button>
              <button
                onClick={cancelEdit}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white flex items-center gap-1"
                title="Cancel"
              >
                <FaTimes />
              </button>
            </td>
          </tr>
        );
      }
   return (
        <tr key={feature.id} className="hover:bg-gray-700">
          <td className="border px-3 py-2 text-center">{feature.id}</td>
          <td className="border px-3 py-2">{feature.title}</td>
          <td className="border px-3 py-2">{feature.description}</td>
          <td className="border px-3 py-2 flex gap-2 justify-center">
            <button
              onClick={() => startEdit(feature)}
              className="text-blue-400 hover:text-blue-600"
              title="Edit"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(feature.id)}
              className="text-red-400 hover:text-red-600"
              title="Delete"
            >
              <FaTrash />
            </button>
          </td>
        </tr>
      );
    });
  };

  const renderAddRow = (showAdd, setShowAdd, newFeature, setNewFeature, addFeature, colSpan) => {
    if (!showAdd) {
      return (
        <tr>
          <td colSpan={colSpan} className="border px-3 py-2 text-center">
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              <FaPlus /> Add New
            </button>
          </td>
        </tr>
      );
    }

    return (
      <tr className="bg-gray-800">
        <td className="border px-3 py-2 text-center">#</td>
        <td className="border px-3 py-2">
          <input
            type="text"
            value={newFeature.title}
            onChange={e => setNewFeature(prev => ({ ...prev, title: e.target.value }))}
            className="w-full bg-gray-900 text-white px-2 py-1 rounded border border-gray-700"
            placeholder="Title"
          />
        </td>
        <td className="border px-3 py-2">
          <input
            type="text"
            value={newFeature.description}
            onChange={e => setNewFeature(prev => ({ ...prev, description: e.target.value }))}
            className="w-full bg-gray-900 text-white px-2 py-1 rounded border border-gray-700"
            placeholder="Description"
          />
        </td>
        <td className="border px-3 py-2 flex gap-2 justify-center">
          <button
            onClick={addFeature}
            className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 text-white flex items-center gap-1"
            title="Add"
          >
            <FaSave />
          </button>
          <button
            onClick={() => setShowAdd(false)}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white flex items-center gap-1"
            title="Cancel"
          >
            <FaTimes />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="p-6 bg-[#0b0f19] min-h-screen text-white max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Feature Lists</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Feature List A</h2>
        <table className="w-full table-auto border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-900">
              <th className="border border-gray-700 px-3 py-2">ID</th>
              <th className="border border-gray-700 px-3 py-2">Title</th>
              <th className="border border-gray-700 px-3 py-2">Description</th>
              <th className="border border-gray-700 px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderRows(featuresA, editingA, editFormA, setEditFormA, startEditA, cancelEditA, saveEditA, handleDeleteA)}
            {renderAddRow(showAddA, setShowAddA, newFeatureA, setNewFeatureA, addFeatureA, 4)}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Feature List B</h2>
        <table className="w-full table-auto border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-900">
              <th className="border border-gray-700 px-3 py-2">ID</th>
              <th className="border border-gray-700 px-3 py-2">Title</th>
              <th className="border border-gray-700 px-3 py-2">Description</th>
              <th className="border border-gray-700 px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderRows(featuresB, editingB, editFormB, setEditFormB, startEditB, cancelEditB, saveEditB, handleDeleteB)}
            {renderAddRow(showAddB, setShowAddB, newFeatureB, setNewFeatureB, addFeatureB, 4)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
