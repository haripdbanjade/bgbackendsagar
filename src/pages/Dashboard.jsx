


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex items-center justify-center px-2">
      <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 shadow-xl rounded-3xl p-10 sm:p-12 max-w-xl  h-[400] w-full text-center transition duration-500 transform hover:scale-[1.02]">
        <FaUserCircle className="text-white text-6xl mx-auto mb-6 animate-bounce" />
        
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Welcome{user ? `, ${user.name}` : ""}!
        </h1>

        <p className="text-white/90 text-lg mb-6">
          This is your personalized dashboard. Manage your services and explore tools built just for you.
        </p>

        {user && (
          <div className="bg-white/20 p-4 rounded-lg text-white text-left mb-4">
            <p><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Role:</span> {user.role || 'User'}</p>
          </div>
        )}

        <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
          <button onClick={() => navigate("/profile")} className="bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition">View Profile</button>
          <button onClick={() => navigate("/services")} className="bg-white text-purple-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition">Manage Feature</button>
        </div>


        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

        <div className="text-white/80 italic mt-6">
          — Your Servicer, <strong>Gaming Market</strong>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;  