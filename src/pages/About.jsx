
"use client";
import React, { useState } from "react";

export default function AboutUsEditor() {
  const [text, setText] = useState(
    "Welcome to our Game CMS platform! We are passionate about providing a seamless experience to manage and showcase your favorite games.\n\nOur mission is to empower gamers and developers by offering an easy-to-use content management system designed specifically for games and their details.\n\nThis project is built with React and Next.js, leveraging modern web technologies like Tailwind CSS for a responsive and visually appealing interface.\n\nFeel free to contact us for suggestions, collaborations, or support!"
  );
  const [font, setFont] = useState("Arial");
  const [bold, setBold] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-[#0d1117] text-white font-sans flex flex-col">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-red-500 mb-2">About Us</h1>
        <p className="text-gray-400">Learn more about our team and mission.</p>
      </header>

      {/* Controls */}
      <div className="mb-6 space-y-4">
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

        <button
          onClick={() => setBold(!bold)}
          className={`w-full py-3 rounded-md font-semibold transition-colors duration-300 ${
            bold ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          {bold ? "Bold Text" : "Normal Text"}
        </button>
      </div>

      {/* Editable textarea */}
      <textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-4 rounded-md bg-gray-800 text-white resize-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
        placeholder="Type your About Us content here..."
        style={{ fontFamily: font, fontWeight: bold ? "700" : "400" }}
      />

      {/* Preview */}
      <section
        className="whitespace-pre-wrap border border-gray-700 p-6 rounded-md bg-gray-800 text-gray-300 flex-grow"
        style={{ fontFamily: font, fontWeight: bold ? "700" : "400" }}
      >
        {text || "Your About Us content preview..."}
      </section>

      <footer className="mt-12 border-t border-gray-700 pt-4 text-gray-500 text-sm text-center">
        &copy; {new Date().getFullYear()} Game CMS. All rights reserved.
      </footer>
    </div>
  );
}
