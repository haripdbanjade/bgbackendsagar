import React from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
  
    const userData = {
      name: "Sirjana Bhattarai",
      email: "sirjana@example.com",
      role: "Admin",
    };
    

    login(userData);
    navigate("/dashboard"); 
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow rounded max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <button
          onClick={handleLogin}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Login as Sirjana
        </button>
      </div>
    </div>
  );
}
