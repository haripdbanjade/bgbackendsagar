
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "FEA", path: "/fea" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Spin", path: "/spin" },
    { name: "Blog", path: "/blog" },
    { name: "Feature", path: "/feature" },
    { name: "Payment", path: "/payment" },
  ];

  return (
    <aside className="w-64 bg-red-700 text-white min-h-screen">
      <div className="p-5 border-b border-red-600">
        <h1 className="text-3xl font-extrabold">GameVerse</h1>
      </div>
      <nav className="p-5 space-y-3">
        {links.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className={`block font-bold py-2 px-3 rounded transition ${
              location.pathname === path ? "bg-red-600" : "hover:bg-red-600"
            }`}
          >
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

