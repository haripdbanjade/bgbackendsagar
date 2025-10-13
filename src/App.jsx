<Routes>
  {/* Default route */}
  <Route
    path="/"
    element={user ? <Navigate to="/dashboard" replace /> : <Login />}
  />

  {/* Optional: keep /login route too */}
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
