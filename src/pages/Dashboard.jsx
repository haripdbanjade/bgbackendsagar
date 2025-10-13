import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 px-4">
      <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 shadow-xl rounded-3xl p-6 sm:p-10 md:p-12 max-w-md sm:max-w-xl w-full text-center transition-transform transform hover:scale-[1.02] flex flex-col justify-center">

        <FaUserCircle className="text-white text-5xl sm:text-6xl mx-auto mb-5 sm:mb-6 animate-bounce" />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
          Welcome{user ? `, ${user.name}` : ""}!
        </h1>

        <p className="text-white/90 text-sm sm:text-base md:text-lg mb-5 sm:mb-6">
          This is your personalized dashboard. Manage your services and explore tools built just for you.
        </p>

        {user && (
          <div className="bg-white/20 p-3 sm:p-4 rounded-lg text-white text-left mb-5">
            <p className="text-sm sm:text-base"><span className="font-semibold">Name:</span> {user.name}</p>
            <p className="text-sm sm:text-base"><span className="font-semibold">Email:</span> {user.email}</p>
            <p className="text-sm sm:text-base"><span className="font-semibold">Role:</span> {user.role || "User"}</p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 sm:py-2.5 px-4 rounded-lg hover:bg-red-600 transition text-sm sm:text-base w-full mb-5"
        >
          Logout
        </button>

        <div className="text-white/80 italic text-xs sm:text-sm mt-auto">
          — Your Servicer, <strong>Gaming Market</strong>
        </div>
      </div>
    </div>
  );
}
