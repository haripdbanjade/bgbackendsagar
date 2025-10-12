import React, { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center p-5 bg-white border-b shadow-sm relative">
      <div>
        <div className="text-lg font-semibold text-gray-800">List All Data</div>
    
      </div>
 
      <div className="flex items-center space-x-3 relative">
  
        <div
          className="text-sm text-right cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="font-semibold text-gray-800">Gaming Market</div>
          <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">
            Admin
          </span>
        </div>
        <div className="text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          ▼
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-44 bg-white border rounded shadow-md z-10">
            <ul className="text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Logout</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
