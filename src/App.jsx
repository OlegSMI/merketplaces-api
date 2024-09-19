import { Route, Routes } from "react-router-dom";

import { ErrorBoundary } from "react-error-boundary";
import { Admin, Login, Registration, User } from "./pages";

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Routes>
        <Route path="/user*" element={<User />} />
        <Route path="/admin*" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
