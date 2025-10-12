import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "FEA", path: "/fea" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Spin", path: "/spin" },
    { name: "Blog", path: "/blog" },
   { name: "Feature", path: "/feature" },


  ];

  return (
    <aside className="w-64 bg-red-700 text-white flex flex-col min-h-screen">
      <div className="p-5 border-b border-red-600">
        <div className="text-3xl font-extrabold">GameVerse</div>
      </div>
      <nav className="p-5 space-y-3">
        {links.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className="block font-bold py-2 px-3 rounded hover:bg-red-600 transition"
          >
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
