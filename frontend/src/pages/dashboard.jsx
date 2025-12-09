// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
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
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/logs")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
        setLoading(false);
      })
      .catch((err) => console.error("❌ Fetch Error:", err));
  }, []);

  if (loading)
    return (
      <div className="text-cyan-300 flex items-center justify-center min-h-screen">
        Loading dashboard...
      </div>
    );

  // Count stats
  const activeAlerts = logs.length;
  const openIncidents = logs.filter((l) => l.severity === "High").length;
  const blockedThreats = logs.filter((l) => l.action === "Blocked").length;

  // Severity distribution
  const severityData = {
    High: logs.filter((l) => l.severity === "High").length,
    Medium: logs.filter((l) => l.severity === "Medium").length,
    Low: logs.filter((l) => l.severity === "Low").length,
  };

  // Attack Type (ML Prediction)
  const attackTypeCount = {};
  logs.forEach((l) => {
    attackTypeCount[l.predicted_attack] =
      (attackTypeCount[l.predicted_attack] || 0) + 1;
  });

  const categoryData = {
    labels: Object.keys(attackTypeCount),
    datasets: [
      {
        data: Object.values(attackTypeCount),
        backgroundColor: ["#00E5FF", "#36A2EB", "#FF4B4B", "#FFD93D", "#8A2BE2"],
      },
    ],
  };

  // Line chart dummy data (replace later with timestamps)
  const lineData = {
    labels: ["10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"],
    datasets: [
      {
        label: "Threat Attempts",
        data: [5, 8, 12, 7, 10, activeAlerts],
        borderColor: "#00E5FF",
        backgroundColor: "rgba(0, 229, 255, 0.35)",
        fill: true,
        tension: 0.35,
      },
    ],
  };

  // Live feed — latest 5 logs
  const threatFeed = logs.slice(-5).reverse();

  // Top attacker IP frequency
  const ipCount = {};
  logs.forEach((l) => {
    if (!l.source_ip) return;
    ipCount[l.source_ip] = (ipCount[l.source_ip] || 0) + 1;
  });

  const topIPs = Object.entries(ipCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([ip, count]) => ({ ip, count, country: "Unknown" }));

  const severityBadge = (s) => ({
    High: "bg-red-500/20 text-red-300 border border-red-600",
    Medium: "bg-yellow-500/20 text-yellow-300 border border-yellow-600",
    Low: "bg-green-500/20 text-green-300 border border-green-600",
  }[s]);


  return (
    <div className="flex bg-[#000814] min-h-screen text-white relative">
      <Sidebar />
      <div className="flex-1 md:ml-56 p-6 md:p-8">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8">
          ⚡ SOC Dashboard (AI-Powered)
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Active Alerts", value: activeAlerts, color: "text-yellow-300" },
            { label: "High Severity", value: openIncidents, color: "text-red-400" },
            { label: "Threats Blocked", value: blockedThreats, color: "text-green-400" },
          ].map((c, i) => (
            <div key={i} className="p-6 bg-[#0A1A2F] rounded-xl text-center border border-cyan-600">
              <p className="text-sm text-gray-400">{c.label}</p>
              <p className={`text-4xl font-bold mt-2 ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className="bg-[#0A1A2F] border border-cyan-600 rounded-xl p-5 shadow-lg">
            <p className="text-cyan-300 mb-3">📈 Threat Attempts</p>
            <Line data={lineData} />
          </div>

          <div className="bg-[#0A1A2F] border border-cyan-600 rounded-xl p-5 shadow-lg">
            <p className="text-cyan-300 mb-3">🧠 AI Attack Predictions</p>
            <Doughnut data={categoryData} />
          </div>
        </div>

        {/* Feed + IP table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className="bg-[#0A1A2F] p-5 rounded-xl border border-red-600">
            <p className="text-red-300 mb-3">🚨 Live Threat Feed</p>
            <div className="h-56 overflow-y-auto space-y-3 pr-2">
              {threatFeed.map((l) => (
                <div key={l._id} className="border-b pb-1 border-red-900/40">
                  <p className="font-semibold">{l.predicted_attack}</p>
                  <p className="text-xs text-gray-300">{l.Scenario_Description}</p>
                  <span className={`inline-block text-[10px] px-2 rounded-md ${severityBadge(l.severity)}`}>
                    {l.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0A1A2F] p-5 rounded-xl border border-cyan-600">
            <p className="text-cyan-300 mb-3">🔥 Top Attacker IPs</p>
            <table className="w-full text-left text-sm">
              <tbody>
                {topIPs.map((i) => (
                  <tr key={i.ip} className="border-b border-cyan-900">
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
    </div>
  );
}

