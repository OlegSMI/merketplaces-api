import { Routes, Route } from "react-router-dom";

import { User, Admin, Login, Registration } from "./pages";
import { ProtectedRoute } from "./components";

function App() {
  return (
    <Routes>
      <Route
        path="/user*"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin*"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      {/* <ProtectedRoute path="/user*" element={<User />} /> */}
      {/* <Route path="/admin*" element={<Admin />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
    </Routes>
  );
}

export default App;
