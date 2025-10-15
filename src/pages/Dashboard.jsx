import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  FaCrown,
  FaNewspaper,
  FaRegClock,
  FaSignOutAlt,
  FaSyncAlt,
  FaTrophy,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fake data
  const spinWinners = 27;
  const activeUsers = 142;
  const newBlogs = [
    { id: 1, title: "How to Win Big in BG678", date: "Oct 12, 2025" },
    { id: 2, title: "5 Tips for Secure Payments", date: "Oct 10, 2025" },
    { id: 3, title: "Latest Game Feature Released!", date: "Oct 8, 2025" },
  ];

  const latestFeatures = [
    { text: "Auto Spin Tracker Added", icon: <FaSyncAlt className="text-green-400 text-xl" /> },
    { text: "Blog Section Improved", icon: <FaNewspaper className="text-red-400 text-xl" /> },
    { text: "New Payment Gateway Added", icon: <FaCrown className="text-yellow-400 text-xl" /> },
    { text: "Real-time Dashboard Metrics", icon: <FaTrophy className="text-purple-400 text-xl" /> },
  ];

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center w-full p-6 md:pl-60">
      <div className="w-full max-w-7xl bg-[#0f172a] shadow-2xl rounded-3xl p-8 sm:p-12 border border-slate-700 text-white mb-50">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
          <div className="flex items-center gap-6">
            <FaUserCircle className="text-7xl text-gray-300" />
            <div>
              <h1 className="text-4xl font-extrabold text-white">
                Welcome, <span className="text-red-500">{user.name}</span> 👋
              </h1>
              <p className="text-slate-400 text-lg mt-1">
                Logged in as <span className="font-semibold text-slate-200">{user.role}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-lg shadow-lg"
          >
            <FaSignOutAlt className="text-xl" /> Logout
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-2xl p-8 flex flex-col items-center shadow-lg hover:scale-105 transition">
            <FaTrophy className="text-5xl mb-4" />
            <h2 className="text-2xl font-bold">Spin Winners</h2>
            <p className="text-4xl font-extrabold mt-3">{spinWinners}</p>
            <p className="text-yellow-100 mt-1">Total people who won</p>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl p-8 flex flex-col items-center shadow-lg hover:scale-105 transition">
            <FaNewspaper className="text-5xl mb-4" />
            <h2 className="text-2xl font-bold">New Blogs</h2>
            <p className="text-4xl font-extrabold mt-3">{newBlogs.length}</p>
            <p className="text-red-100 mt-1">Recently added posts</p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 flex flex-col items-center shadow-lg hover:scale-105 transition">
            <FaSyncAlt className="text-5xl mb-4" />
            <h2 className="text-2xl font-bold">New Features</h2>
            <p className="text-4xl font-extrabold mt-3">{latestFeatures.length}</p>
            <p className="text-green-100 mt-1">Recently added</p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-8 flex flex-col items-center shadow-lg hover:scale-105 transition">
            <FaUsers className="text-5xl mb-4" />
            <h2 className="text-2xl font-bold">Active Users</h2>
            <p className="text-4xl font-extrabold mt-3">{activeUsers}</p>
            <p className="text-blue-100 mt-1">Currently online</p>
          </div>
        </div>

        {/* Blog & Feature List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Blogs */}
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-white">
              <FaNewspaper className="text-red-400 text-2xl" /> Latest Blog Posts
            </h2>
            <ul className="space-y-4">
              {newBlogs.map((blog) => (
                <li
                  key={blog.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] transition"
                >
                  <FaRegClock className="text-red-400 text-2xl" />
                  <div>
                    <h3 className="font-semibold text-lg text-slate-100">{blog.title}</h3>
                    <p className="text-sm text-slate-400">{blog.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="bg-[#1e293b] border border-slate-700 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-5 flex items-center gap-3 text-white">
              <FaCrown className="text-yellow-400 text-2xl" /> New Updates & Features
            </h2>
            <ul className="space-y-4">
              {latestFeatures.map((f, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] transition font-medium text-slate-200 text-lg"
                >
                  {f.icon}
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-base mt-12 font-medium">
          © 2025 BG678 Admin Panel
        </p>
      </div>
    </div>
  );
}
