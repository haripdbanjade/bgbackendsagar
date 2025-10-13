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
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-600 text-white relative overflow-hidden">
      {/* Floating gradient orbs */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-purple-400/40 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-pink-400/40 blur-3xl rounded-full"></div>

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl px-12 py-10 w-[90%] max-w-lg text-center animate-fade-in">
        <div className="flex flex-col items-center space-y-3 mb-6">
          <FaUserCircle className="text-6xl text-white/90 drop-shadow-lg" />
          <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-md">
            Welcome, <span className="text-yellow-300">{user.name}</span> 👋
          </h1>
          <p className="text-white/70 text-sm">
            You’re logged in as <span className="font-semibold">{user.role}</span>
          </p>
        </div>

        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3 flex items-center justify-center gap-2">
            <FaCrown className="text-yellow-300" />
            GameVerse Admin Panel
          </h2>
          <p className="text-white/70 text-sm">
            Manage your dashboard, track live users, view reports, and more.
          </p>
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-gray-900 font-semibold px-6 py-3 rounded-2xl hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}
