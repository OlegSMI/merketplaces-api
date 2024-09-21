import { Route, Routes, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect } from "react";

import { ProtectedRoute } from "./components";
import { Admin, Login, Registration, User } from "./pages";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/user/main/table");
  }, []);

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Routes>
        <Route
          path="/user/*"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
