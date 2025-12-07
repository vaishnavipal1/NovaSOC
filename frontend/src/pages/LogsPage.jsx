// src/pages/LogsPage.jsx

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
  High: "bg-red-500/20 text-red-400 border-red-500/40",
  Medium: "bg-yellow-500/20 text-yellow-300 border-yellow-400/40",
  Low: "bg-green-500/20 text-green-400 border-green-500/40",
};

export default function LogsPage() {
  return (
    <div className="bg-[#000814] min-h-screen text-white p-6 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2 flex items-center gap-2">
        🔍 Log Monitoring
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        Real-time security event visibility across your SOC environment.
      </p>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-cyan-500/20 bg-[#0A1320]">
        <table className="w-full text-sm md:text-base">
          <thead className="bg-[#0C1C2E] text-cyan-300">
            <tr>
              <th className="p-3 text-left">Timestamp</th>
              <th className="p-3 text-left">Source</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Source IP</th>
              <th className="p-3 text-left">Target</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Severity</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr
                key={log.id}
                className="border-t border-cyan-500/10 hover:bg-[#112233] transition"
              >
                <td className="p-3 whitespace-nowrap text-slate-200">
                  {log.timestamp}
                </td>
                <td className="p-3 text-slate-200">{log.source}</td>
                <td className="p-3 text-slate-200">{log.category}</td>
                <td className="p-3 text-slate-200">{log.sourceIP}</td>
                <td className="p-3 text-slate-200">{log.target}</td>
                <td className="p-3 text-slate-300">{log.message}</td>
                <td className="p-3 text-slate-200">{log.action}</td>
                <td className="p-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${severityColor[log.severity]}`}
                  >
                    {log.severity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
