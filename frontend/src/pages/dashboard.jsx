// src/pages/dashboard.jsx
import { useEffect, useState } from "react";
import StatCards from "../components/StatCards";
import ThreatLineChart from "../components/ThreatLineChart";
import SeverityDonut from "../components/SeverityDonut";
import RadarThreatChart from "../components/RadarThreatChart";
import AttackMultiTrend from "../components/AttackMultiTrend";
import LiveFeed from "../components/LiveFeed";
import TopIPs from "../components/TopIPs";

export default function DashboardPage() {
  const [stats, setStats] = useState({ active: 0, open: 0, blocked: 0 });
  const [lineData, setLineData] = useState([]);
  const [severityData, setSeverityData] = useState([]);
  const [radarData, setRadarData] = useState([]);
  const [multiTrend, setMultiTrend] = useState([]);
  const [topIPs, setTopIPs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [summary, trend, sev, radar, top] = await Promise.all([
          fetch("http://localhost:4000/api/analytics/summary", {
            headers,
          }).then((r) => r.json()),
          // 🔥 single call for both line + multi-trend
          fetch("http://localhost:4000/api/analytics/trend-multi", {
            headers,
          }).then((r) => r.json()),
          fetch("http://localhost:4000/api/analytics/severity", {
            headers,
          }).then((r) => r.json()),
          fetch("http://localhost:4000/api/analytics/categories", {
            headers,
          }).then((r) => r.json()),
          fetch("http://localhost:4000/api/analytics/top-ips", {
            headers,
          }).then((r) => r.json()),
        ]);

        setStats(summary.stats || { active: 0, open: 0, blocked: 0 });

        // Right now both use same data; adjust if backend later splits them
        const trendData = trend.data || [];
        setLineData(trendData);
        setMultiTrend(trendData);

        setSeverityData(sev.data || []);
        setRadarData(radar.data || []);
        setTopIPs(top.data || []);
      } catch (error) {
        console.error("Dashboard load failed:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#000814] min-h-screen text-white p-6 md:p-8 flex items-center justify-center">
        <p className="text-cyan-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#000814] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
        <StatCards stats={stats} />

        {/* ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-6">
          <div className="min-h-80">
            <ThreatLineChart data={lineData} />
          </div>
          <div className="min-h-80">
            <SeverityDonut data={severityData} />
          </div>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="min-h-80">
            <RadarThreatChart data={radarData} />
          </div>
          <div className="min-h-80">
            <AttackMultiTrend data={multiTrend} />
          </div>
        </div>

        {/* ROW 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <LiveFeed />
          </div>

          <div className="space-y-6">
            <TopIPs ips={topIPs} />
          </div>
        </div>
      </div>
    </div>
  );
}
