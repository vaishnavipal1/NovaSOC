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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:4000/api/analytics/summary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setStats({
            alerts: data.stats?.active || 0,
            openIncidents: data.stats?.open || 0,
            blockedThreats: data.stats?.blocked || 0,
          });
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const alerts = stats.alerts;
  const openIncidents = stats.openIncidents;
  const blockedThreats = stats.blockedThreats;

  const lineData = {
    labels: ["10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"],
    datasets: [
      {
        label: "Threat Attempts",
        data: [3, 6, 4, 8, 7, 11],
        borderColor: "#00E5FF",
        backgroundColor: "rgba(0, 229, 255, 0.35)",
        fill: true,
        tension: 0.35,
      },
    ],
  };

  const categoryData = {
    labels: ["Brute Force", "Malware", "Port Scan", "SQL Injection"],
    datasets: [
      {
        data: [35, 20, 25, 20],
        backgroundColor: ["#00E5FF", "#36A2EB", "#FF4B4B", "#FFD93D"],
        hoverOffset: 7,
      },
    ],
  };

  const radarData = {
    labels: ["Brute Force", "Malware", "Port Scan", "SQLi", "XSS"],
    datasets: [
      {
        label: "High Severity",
        data: [8, 5, 7, 3, 4],
        backgroundColor: "rgba(255, 75, 75, 0.25)",
        borderColor: "#FF4B4B",
        borderWidth: 2.2,
        pointRadius: 4,
        pointBackgroundColor: "#FF4B4B",
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

  const topIPs = [
    { ip: "45.66.90.12", count: 10, country: "US" },
    { ip: "103.22.44.19", count: 7, country: "IN" },
    { ip: "152.32.76.98", count: 5, country: "RU" },
  ];

  const threatFeed = [
    {
      time: "14:32",
      type: "SQL Injection",
      msg: "Blocked injection attempt on /login",
      severity: "High",
    },
    {
      time: "14:21",
      type: "Brute Force",
      msg: "Multiple failed logins from 103.22.44.19",
      severity: "Medium",
    },
    {
      time: "14:10",
      type: "Port Scan",
      msg: "Port scan detected against web server",
      severity: "Low",
    },
    {
      time: "13:55",
      type: "Malware",
      msg: "Suspicious file quarantined on host-09",
      severity: "High",
    },
  ];

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
            {threatFeed.map((t, i) => (
              <div key={i} className="border-b border-red-900/40 pb-2">
                <p className="text-sm font-semibold">{t.type}</p>
                <p className="text-xs text-gray-300">{t.msg}</p>
                <span
                  className={`text-[10px] mt-1 inline-block px-2 py-[1px] rounded-md ${severityBadge(
                    t.severity
                  )}`}
                >
                  {t.severity}
                </span>
              </div>
            ))}
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
                <th className="p-2">Region</th>
              </tr>
            </thead>
            <tbody>
              {topIPs.map((i) => (
                <tr
                  key={i.ip}
                  className="border-b border-cyan-900 hover:bg-[#112233] transition"
                >
                  <td className="p-2">{i.ip}</td>
                  <td className="p-2 text-yellow-300">{i.count}</td>
                  <td className="p-2">{i.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
