import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LogsPage from "./pages/LogsPage";
import Dashboard from "./pages/dashboard";
import Incidents from "./pages/IncidentsPage";
import ThreatMapPage from "./pages/ThreatMapPage";
import AdminPage from "./pages/AdminPage";
import MainLayout from "./layouts/MainLayout"; // 👈 NEW

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login WITHOUT sidebar */}
        <Route path="/" element={<LoginPage />} />

        {/* All routes WITH sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logs" element={<LogsPage />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/threat-map" element={<ThreatMapPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
