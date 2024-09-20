import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { SnackbarProvider } from "notistack";
import { ProtectedRoute } from "./components";
import { LoadingContext } from "./context";
import { Admin, Login, Registration, User } from "./pages";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Cookies.get("token")) {
      return;
    } else navigate("/login");
  }, []);

  return (
    <SnackbarProvider maxSnack={3}>
      <LoadingContext.Provider value={{ loading, setLoading }}>
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
      </LoadingContext.Provider>
    </SnackbarProvider>
  );
}

export default App;
