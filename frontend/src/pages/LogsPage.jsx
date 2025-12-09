// src/pages/LogsPage.jsx
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const severityColor = {
  High: "bg-red-600/30 text-red-300 px-2 py-1 rounded-md font-semibold",
  Medium: "bg-yellow-600/30 text-yellow-300 px-2 py-1 rounded-md font-semibold",
  Low: "bg-green-600/30 text-green-300 px-2 py-1 rounded-md font-semibold",
  Unknown: "bg-gray-600/30 text-gray-300 px-2 py-1 rounded-md font-semibold",
};

const attackColor = {
  "Web Attacks": "text-cyan-300",
  "DoS & DDoS": "text-red-400",
  "Reconnaissance": "text-yellow-300",
  "Malware & Exploits": "text-purple-400",
  "Credential Attacks": "text-orange-300",
  Other: "text-gray-300",
};

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/logs")
      .then((res) => res.json())
      .then((data) => {
        console.log("📥 Logs Received:", data);
        setLogs(data);
      })
      .catch((err) => console.error("Error fetching logs:", err));
  }, []);

  return (
    <div className="flex bg-[#000814] min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 md:ml-64 p-6 transition-all duration-300">
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6">
          🔍 AI-Powered Log Monitoring
        </h1>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full text-sm md:text-base bg-[#0A1320] border border-cyan-500/20">
            <thead className="bg-[#0C1C2E] text-cyan-300">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Source IP</th>
                <th className="p-3">Attack Type</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Message</th>
              </tr>
            </thead>

            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-5 text-gray-400">
                    🚫 No logs available — Generate logs or ingest data
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id} className="border-b border-cyan-500/10 hover:bg-[#112233] transition">
                    <td className="p-3">{log.timestamp || "N/A"}</td>
                    <td className="p-3">{log.source_ip || "N/A"}</td>

                    <td className={`p-3 font-semibold ${attackColor[log.attack_type] || "text-gray-300"}`}>
                      {log.attack_type || "Unknown"}
                    </td>

                    <td className="p-3">
                      <span className={severityColor[log.severity] || severityColor["Unknown"]}>
                        {log.severity || "Unknown"}
                      </span>
                    </td>

                    <td className="p-3">{log.message || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

