import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const validUsername = "GameVerse";
    const validPassword = "Gaming@123";

    if (email === validUsername && password === validPassword) {
      const userData = {
        name: "GameVerse",
        email: "gaming@gmail.com",
        role: "Admin",
      };
      login(userData);
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleGoogleLogin = () => {
    const googleUser = {
      name: "GameVerse (Google)",
      email: "gaming@google.com",
      role: "Admin",
    };
    login(googleUser);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl px-8 py-10 max-w-sm w-full text-center border border-white/40 transition-transform hover:scale-[1.02] duration-300">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-3 tracking-tight">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 mb-8">
          Login to continue as{" "}
          <span className="font-semibold text-purple-600">Gameverse</span>
        </p>

        <form onSubmit={handleLogin} className="space-y-5 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl py-3 hover:bg-gray-50 hover:shadow transition-all duration-300"
        >
          <FcGoogle size={22} />
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>

        <div className="mt-6 text-sm text-gray-500 space-y-2">
          <p>
            <a
              href="/forgot-password"
              className="text-purple-600 font-medium hover:underline"
            >
              Forgot your password?
            </a>
          </p>
          <p>
            New here?{" "}
            <a
              href="/register"
              className="text-purple-600 font-medium hover:underline"
            >
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
