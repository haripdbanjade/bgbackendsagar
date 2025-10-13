import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './component/Sidebar';
import Header from './component/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Fea from './pages/Fea';
import Gallery from './pages/Gallery';
import About from "./pages/About";
import Blog from './pages/Blog';
import Spin from './pages/SpinWhell';
import Payment from "./pages/Payment"
import Feature from "./pages/Feature"
import { useAuth } from './hooks/useAuth';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/" replace />; // "/" is your login route now
  }
  // Logged in, show children
  return children;
}

export default function App() {
  // Destructure user from your auth hook
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <div className="flex min-h-screen font-sans">
        {/* Show Sidebar and Header only if logged in */}
        {user && <Sidebar />}

        {/* Right side layout */}
        <div className="flex-1 flex flex-col">
          {user && <Header />}

          {/* Main content */}
          <main className="flex-1 p-10 bg-gray-50">
            <Routes>
              {/* Default route */}
              <Route
                path="/"
                element={user ? <Navigate to="/dashboard" replace /> : <Login />}
              />

              {/* Optional /login route */}
              <Route
                path="/login"
                element={user ? <Navigate to="/dashboard" replace /> : <Login />}
              />

              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/fea"
                element={
                  <ProtectedRoute>
                    <Fea />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gallery"
                element={
                  <ProtectedRoute>
                    <Gallery />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blog"
                element={
                  <ProtectedRoute>
                    <Blog />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/feature"
                element={
                  <ProtectedRoute>
                    <Feature />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/spin"
                element={
                  <ProtectedRoute>
                    <Spin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
