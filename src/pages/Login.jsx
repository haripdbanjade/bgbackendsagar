import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validUsername = "Gameverse";
  const validPassword = "Gaming@123";

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === validUsername && password === validPassword) {
      const userData = {
        name: "Sirjana Bhattarai",
        email: "sirjana@example.com",
        role: "Admin",
      };
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", "dummy_token_123");
      navigate("/dashboard");
    } else {
      setError("Invalid username or password ❌");
    }
  };

  const handleGoogleLogin = () => {
    const googleUser = {
      name: "Sirjana Bhattarai (Google)",
      email: "sirjana@gmail.com",
      role: "Admin",
    };
    localStorage.setItem("user", JSON.stringify(googleUser));
    localStorage.setItem("token", "dummy_token_google");
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 px-4">
      <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl px-6 sm:px-8 py-8 sm:py-10 max-w-sm w-full text-center border border-white/40 transition-transform hover:scale-[1.02] duration-300">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3 tracking-tight">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 mb-6">
          Login to continue as <span className="font-semibold text-purple-600">Sirjana</span>
        </p>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter username"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center mt-1">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 hover:bg-gray-50 hover:shadow transition-all duration-300"
        >
          <FcGoogle size={20} />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        <div className="mt-5 text-sm text-gray-500 space-y-1">
          <p>
            <a href="/forgot-password" className="text-purple-600 font-medium hover:underline">
              Forgot your password?
            </a>
          </p>
          <p>
            New here?{" "}
            <a href="/register" className="text-purple-600 font-medium hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
