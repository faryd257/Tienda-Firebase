
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { Login } from "../Pages/Login/Login";
import { Registro } from "../Pages/Registro/Registro";
import { NotFound } from "../Pages/NotFound/NotFound";
import { Dashboard } from "../Pages/Dashboard";
import { ProtectedRoute } from "../components/ProtectedRoute";

const RouterApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export { RouterApp };