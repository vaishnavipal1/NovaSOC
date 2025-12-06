// src/pages/LogsPage.jsx
import Sidebar from "../components/Sidebar";

const logs = [
  {
    id: 1,
    timestamp: "2025-12-04 14:25:16",
    source: "Firewall",
    category: "Port Scan",
    sourceIP: "103.22.44.19",
    target: "Web Server",
    message: "Blocked unauthorized access attempt",
    severity: "High",
    action: "Blocked",
  },
  {
    id: 2,
    timestamp: "2025-12-04 13:11:42",
    source: "System",
    category: "Malware Scan",
    sourceIP: "-",
    target: "System Core",
    message: "Scheduled scan completed",
    severity: "Low",
    action: "Completed",
  },
  {
    id: 3,
    timestamp: "2025-12-04 12:50:30",
    source: "Auth Service",
    category: "Brute Force",
    sourceIP: "45.66.90.12",
    target: "Login API",
    message: "Multiple failed login attempts",
    severity: "Medium",
    action: "Alert Generated",
  },
];

const severityColor = {
  High: "text-red-400 font-bold",
  Medium: "text-yellow-300 font-bold",
  Low: "text-green-400 font-bold",
};

export default function LogsPage() {
  return (
    <div className="flex bg-[#000814] min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 md:ml-64 p-6 transition-all duration-300">
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6">
          🔍 Log Monitoring
        </h1>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full text-sm md:text-base bg-[#0A1320] border border-cyan-500/20">
            <thead className="bg-[#0C1C2E] text-cyan-300">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Source</th>
                <th className="p-3">Category</th>
                <th className="p-3">Source IP</th>
                <th className="p-3">Target</th>
                <th className="p-3">Message</th>
                <th className="p-3">Action</th>
                <th className="p-3">Severity</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-cyan-500/10 hover:bg-[#112233] transition"
                >
                  <td className="p-3">{log.timestamp}</td>
                  <td className="p-3">{log.source}</td>
                  <td className="p-3">{log.category}</td>
                  <td className="p-3">{log.sourceIP}</td>
                  <td className="p-3">{log.target}</td>
                  <td className="p-3">{log.message}</td>
                  <td className="p-3">{log.action}</td>
                  <td className={`p-3 ${severityColor[log.severity]}`}>
                    {log.severity}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}


