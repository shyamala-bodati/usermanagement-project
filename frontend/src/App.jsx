import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Employee */}
        <Route
          path="/employee"
          element={
            user
              ? <EmployeeDashboard />
              : <Navigate to="/login" />
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            user && user.role === "admin"
              ? <AdminDashboard />
              : <Navigate to="/login" />
          }
        />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;