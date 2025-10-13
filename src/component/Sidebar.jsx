import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

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
    <>
      {/* Hamburger button for mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-3xl focus:outline-none"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-red-700 text-white z-40
          transform transition-transform duration-300
          md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-5 border-b border-red-600 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold">GameVerse</h1>
          {/* Close button for mobile */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen(false)}
          >
            <HiX />
          </button>
        </div>

        <nav className="p-5 space-y-3 mt-5">
          {links.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={() => setIsOpen(false)} // close menu on mobile
              className={`block font-bold py-2 px-3 rounded transition ${
                location.pathname === path ? "bg-red-600" : "hover:bg-red-600"
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
