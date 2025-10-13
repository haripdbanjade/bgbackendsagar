import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaUserCircle, FaSignOutAlt, FaCrown } from "react-icons/fa";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      {/* Dashboard Card */}
      <div className="bg-red-500 border border-gray-200 shadow-lg rounded-3xl px-6 sm:px-10 py-8 sm:py-10 w-full max-w-md text-center">
        {/* User Info */}
        <div className="flex flex-col items-center space-y-3 mb-6">
          <FaUserCircle className="text-6xl text-black-800 drop-shadow-md" />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome, <span className="text-yellow-500">{user.name}</span> 👋
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            You’re logged in as <span className="font-semibold">{user.role}</span>
          </p>
        </div>

        {/* Panel Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 flex items-center justify-center gap-2 text-black">
            <FaCrown className="text-yellow-500" />
            GameVerse Admin Panel
          </h2>
          <p className="text-black-600 text-sm">
            Manage your dashboard, track live users, view reports, and more.
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-white font-semibold px-6 py-3 rounded-2xl hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}
