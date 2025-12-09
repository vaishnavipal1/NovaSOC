// src/pages/dashboard.jsx

import { useState, useEffect } from "react";
import { Line, Doughnut, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  RadialLinearScale
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    alerts: 0,
    openIncidents: 0,
    blockedThreats: 0,
  });
  const [trendData, setTrendData] = useState([]);
  const [severityData, setSeverityData] = useState([]);
  const [topIPs, setTopIPs] = useState([]);
  const [highRiskIPs, setHighRiskIPs] = useState([]);
  const [threatFeed, setThreatFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch all data in parallel
        const [summaryRes, trendRes, severityRes, topIPsRes, highRiskRes, incidentsRes] = await Promise.all([
          fetch("http://localhost:4000/api/analytics/summary", { headers }),
          fetch("http://localhost:4000/api/analytics/trend-multi", { headers }),
          fetch("http://localhost:4000/api/analytics/severity", { headers }),
          fetch("http://localhost:4000/api/analytics/top-ips", { headers }),
          fetch("http://localhost:4000/api/analytics/high-risk", { headers }),
          fetch("http://localhost:4000/api/incidents?limit=5", { headers }),
        ]);

        const summaryData = await summaryRes.json();
        const trendDataRes = await trendRes.json();
        const severityDataRes = await severityRes.json();
        const topIPsData = await topIPsRes.json();
        const highRiskData = await highRiskRes.json();
        const incidentsData = await incidentsRes.json();

        setStats({
          alerts: summaryData.stats?.active || 0,
          openIncidents: summaryData.stats?.open || 0,
          blockedThreats: summaryData.stats?.blocked || 0,
        });

        setTrendData(trendDataRes.data || []);
        setSeverityData(severityDataRes.data || []);
        setTopIPs(topIPsData.data || []);
        setHighRiskIPs(highRiskData.data || []);
        
        // Format incidents as threat feed
        const feed = (incidentsData.incidents || []).map(incident => ({
          time: new Date(incident.createdAt).toLocaleTimeString(),
          type: incident.type || "Unknown",
          msg: `${incident.type} - Status: ${incident.status}`,
          severity: incident.severity || "Low",
        }));
        setThreatFeed(feed);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const alerts = stats.alerts;
  const openIncidents = stats.openIncidents;
  const blockedThreats = stats.blockedThreats;

  // Line chart data - threat trends over time
  const lineData = {
    labels: trendData.map((d) => d.time || "N/A").slice(0, 12),
    datasets: [
      {
        label: "Brute Force",
        data: trendData.map((d) => d["Bruteforce"] || 0).slice(0, 12),
        borderColor: "#FF6B6B",
        backgroundColor: "rgba(255, 107, 107, 0.1)",
        fill: true,
        tension: 0.35,
      },
      {
        label: "Malware",
        data: trendData.map((d) => d["Malware"] || 0).slice(0, 12),
        borderColor: "#00E5FF",
        backgroundColor: "rgba(0, 229, 255, 0.1)",
        fill: true,
        tension: 0.35,
      },
      {
        label: "Recon",
        data: trendData.map((d) => d["Recon"] || 0).slice(0, 12),
        borderColor: "#FFD93D",
        backgroundColor: "rgba(255, 217, 61, 0.1)",
        fill: true,
        tension: 0.35,
      },
    ],
  };

  // Doughnut chart - severity distribution
  const categoryData = {
    labels: severityData.map((d) => d.name || "Unknown"),
    datasets: [
      {
        data: severityData.map((d) => d.value || 0),
        backgroundColor: severityData.map((d) => {
          const name = d.name?.toLowerCase() || "";
          if (name.includes("high")) return "#FF4B4B";
          if (name.includes("medium")) return "#FFD93D";
          return "#36A2EB";
        }),
        hoverOffset: 7,
      },
    ],
  };

  // Radar chart - incident categories
  const radarData = {
    labels: ["Brute Force", "Malware", "Port Scan", "SQL Injection", "XSS", "DDoS"],
    datasets: [
      {
        label: "Incident Categories",
        data: [
          (severityData.find((d) => d.name?.includes("Brute")) || {}).value || 0,
          (severityData.find((d) => d.name?.includes("Malware")) || {}).value || 0,
          (severityData.find((d) => d.name?.includes("Scan")) || {}).value || 0,
          (severityData.find((d) => d.name?.includes("SQL")) || {}).value || 0,
          (severityData.find((d) => d.name?.includes("XSS")) || {}).value || 0,
          (severityData.find((d) => d.name?.includes("DDoS")) || {}).value || 0,
        ],
        backgroundColor: "rgba(0, 212, 255, 0.25)",
        borderColor: "#00D4FF",
        borderWidth: 2.2,
        pointRadius: 4,
        pointBackgroundColor: "#00D4FF",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 1.5,
      },
    ],
  };

  const severityBadge = (s) => ({
    High: "bg-red-500/20 text-red-300 border border-red-600",
    Medium: "bg-yellow-500/20 text-yellow-300 border border-yellow-600",
    Low: "bg-green-500/20 text-green-300 border border-green-600",
  }[s]);

  // Top attacking IPs from backend data
  const topIPsList = topIPs.slice(0, 5).map((ip) => ({
    ip: ip._id || "N/A",
    count: ip.count || 0,
    severity:
      ip.count > 100 ? "High" : ip.count > 50 ? "Medium" : "Low",
    country: "Unknown",
  }));

  // Threat feed from recent incidents
  const threatFeedList = threatFeed.slice(0, 4).map((incident) => ({
    time: new Date(incident.timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    type: incident.incident_type || "Unknown",
    msg: `${incident.incident_type || "Incident"} from ${incident.source_ip || "Unknown IP"}`,
    severity: incident.severity || "Medium",
  }));

  return (
    <div className="bg-[#000814] min-h-screen text-white p-6 md:p-8 relative overflow-hidden">

      {/* Background glow effects */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full" />

      <h1 className="text-3xl font-bold tracking-wide text-cyan-400 mb-8">
        ⚡ Security Operations Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Active Alerts", value: alerts, color: "text-yellow-300" },
          { label: "Open Incidents", value: openIncidents, color: "text-red-400" },
          { label: "Threats Blocked", value: blockedThreats, color: "text-green-400" },
        ].map((c, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-[#0A1A2F] border border-cyan-600 shadow-xl hover:shadow-cyan-500/40 hover:scale-105 transition text-center"
          >
            <p className="text-sm text-gray-400">{c.label}</p>
            <p className={`text-4xl font-bold mt-2 ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Line + Radar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        {/* Line Chart */}
        <div className="bg-[#0A1A2F] border border-cyan-600 rounded-xl p-5 shadow-lg">
          <p className="text-cyan-300 mb-3">📈 Threat Attempts Over Time</p>
          <Line data={lineData} />
        </div>

        {/* Radar Chart */}
        <div className="bg-[#0A1A2F]/90 border border-purple-500 rounded-xl p-5 shadow-lg">
          <h3 className="text-purple-300 mb-3 text-sm md:text-base">
            🎯 High Severity Attack Types
          </h3>

          <div className="w-full h-48 md:h-60">
            <Radar
              data={radarData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  r: {
                    ticks: { display: false },
                    grid: { color: "rgba(0,255,255,0.15)" },
                    angleLines: { color: "rgba(0,255,255,0.12)" },
                    pointLabels: {
                      color: "#ccf9ff",
                      font: { size: 10 },
                    },
                  },
                },
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>
      </div>

      {/* Donut + World Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Donut */}
        <div className="bg-[#0A1A2F]/90 border border-cyan-600 rounded-xl p-5 shadow-lg flex flex-col items-center">
          <h3 className="text-cyan-300 mb-3 text-sm md:text-base w-full">
            🧠 Attack Category Distribution
          </h3>

          <div className="w-56 md:w-64">
            <Doughnut data={categoryData} />
          </div>
        </div>

        {/* World Map (Dummy) */}
        <div className="bg-[#0A1A2F]/90 border border-cyan-600 rounded-xl p-5 shadow-lg relative">
          <h3 className="text-cyan-300 mb-3 text-sm md:text-base">
            🌍 Global Attack Surface (Dummy)
          </h3>

          <div className="relative w-full h-64 bg-[#02101f] rounded-lg overflow-hidden">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
              alt="Map"
              className="w-full h-full object-cover opacity-20"
            />

            {/* Attack Dots */}
            <div className="absolute w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_#ff0000] top-[38%] left-[34%]" />
            <div className="absolute w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_8px_#ffee00] top-[52%] left-[58%]" />
            <div className="absolute w-3 h-3 bg-green-400 rounded-full shadow-[0_0_8px_#00ff00] top-[63%] left-[41%]" />

            <p className="absolute bottom-1 left-2 text-[10px] text-gray-400 opacity-70">
              * Dummy cyber attack visualization
            </p>
          </div>
        </div>
      </div>

      {/* Feed + IP Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 mb-10">
        {/* Threat Feed */}
        <div className="bg-[#0A1A2F] border border-red-600 rounded-xl p-5 shadow-lg">
          <p className="text-red-300 mb-3">🚨 Live Threat Feed</p>
          <div className="overflow-y-auto h-56 space-y-3 pr-2">
            {threatFeedList.length > 0 ? (
              threatFeedList.map((t, i) => (
                <div key={i} className="border-b border-red-900/40 pb-2">
                  <p className="text-sm font-semibold">{t.type}</p>
                  <p className="text-xs text-gray-300">{t.msg}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span
                      className={`text-[10px] px-2 py-[1px] rounded-md ${severityBadge(
                        t.severity
                      )}`}
                    >
                      {t.severity}
                    </span>
                    <span className="text-[10px] text-gray-400">{t.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No recent threats detected</p>
            )}
          </div>
        </div>

        {/* Top IPs */}
        <div className="bg-[#0A1A2F] border border-cyan-600 rounded-xl p-5 shadow-lg">
          <p className="text-cyan-300 mb-3">🔥 Top Attacker IPs</p>
          <table className="w-full text-left text-sm">
            <thead className="border-b border-cyan-700">
              <tr>
                <th className="p-2">IP</th>
                <th className="p-2">Attempts</th>
                <th className="p-2">Severity</th>
              </tr>
            </thead>
            <tbody>
              {topIPsList.length > 0 ? (
                topIPsList.map((i) => (
                  <tr
                    key={i.ip}
                    className="border-b border-cyan-900 hover:bg-[#112233] transition"
                  >
                    <td className="p-2 font-mono text-xs">{i.ip}</td>
                    <td className="p-2 text-yellow-300 font-semibold">{i.count}</td>
                    <td className="p-2">
                      <span className={`text-xs px-2 py-1 rounded ${severityBadge(i.severity)}`}>
                        {i.severity}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-2 text-gray-400 text-center">
                    No IP data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
