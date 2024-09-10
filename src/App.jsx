import { Routes, Route } from "react-router-dom";

import { User, Admin, Login, Registration } from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/user*" element={<User />} />
      <Route path="/admin*" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
}

export default App;
