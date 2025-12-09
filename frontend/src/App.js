

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LogsPage from "./pages/LogsPage";
import Dashboard from "./pages/dashboard";
import Incidents from "./pages/IncidentsPage";
import ThreatMapPage from "./pages/ThreatMapPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/threat-map" element={<ThreatMapPage />} /> {/* ✔ Only one route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

