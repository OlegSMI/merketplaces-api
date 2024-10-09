import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { ProtectedRoute } from "./components";
import { Admin, Login, Registration, User } from "./pages";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // navigate("/admin/main/table"); Вернуть когда будут остальные страницы
    navigate("/admin/collecting");
  }, []);

  return (
    <SnackbarProvider maxSnack={3}>
      <Routes>
        {/* <Route
            path="/user/*"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          /> */}
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
    </SnackbarProvider>
  );
}

export default App;
