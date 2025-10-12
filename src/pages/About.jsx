"use client";
import { useState } from "react";

export default function SimpleAboutEditor() {
  const [text, setText] = useState(
    "Write your About Us content here...\nEnglish, Nepali or mixed is fine."
  );
  const [font, setFont] = useState("Arial");
  const [bold, setBold] = useState(false);

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg space-y-6">
      {/* Font family selector */}
      <select
        value={font}
        onChange={(e) => setFont(e.target.value)}
        className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option>Arial</option>
        <option>Times New Roman</option>
        <option>Courier New</option>
        <option>Helvetica</option>
        <option>Calibri</option>
        <option>Roboto</option>
        <option>Mangal</option> {/* Nepali font */}
      </select>

      {/* Bold toggle button */}
      <button
        onClick={() => setBold(!bold)}
        className={`w-full py-3 rounded-md font-semibold transition-colors duration-300 ${
          bold
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
      >
        {bold ? "Bold Text" : "Normal Text"}
      </button>

      {/* Editable textarea */}
      <textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-4 rounded-md bg-gray-800 text-white resize-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Type your About Us content here..."
        style={{ fontFamily: font, fontWeight: bold ? "700" : "400" }}
      />

      {/* Clear button */}
      <button
        onClick={() => setText("")}
        className="w-full py-3 rounded-md bg-red-600 hover:bg-red-700 font-semibold transition-colors duration-300"
      >
        Clear Text
      </button>

      {/* Preview */}
      <div
        className="whitespace-pre-wrap border border-gray-700 p-4 rounded-md bg-gray-800"
        style={{ fontFamily: font, fontWeight: bold ? "700" : "400" }}
      >
        {text || "Your About Us content preview..."}
      </div>
    </div>
  );
}
