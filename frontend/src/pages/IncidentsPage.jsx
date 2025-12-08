// src/pages/IncidentsPage.jsx

import { useState, useEffect } from "react";

const statusColors = {
  Open: "text-red-400 font-semibold",
  "In Progress": "text-yellow-300 font-semibold",
  Investigating: "text-yellow-300 font-semibold",
  Resolved: "text-green-400 font-semibold",
};

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/api/incidents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch incidents");
        }

        const data = await response.json();
        setIncidents(data.incidents || []);
      } catch (err) {
        console.error("Error fetching incidents:", err);
        setError("Failed to load incidents from server");
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#000814] min-h-screen text-white p-6 md:p-8 flex items-center justify-center">
        <p className="text-cyan-400">Loading incidents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#000814] min-h-screen text-white p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">
          🛡 Incident Response
        </h1>
        <div className="bg-red-500/20 border border-red-500/40 p-4 rounded text-red-300">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#000814] min-h-screen text-white p-6 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6">
        🛡 Incident Response
      </h1>

      {incidents.length === 0 ? (
        <div className="bg-[#0A1320] p-6 rounded-lg border border-cyan-500/20 text-center">
          <p className="text-slate-400">No incidents available</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full bg-[#0A1320] border border-cyan-500/20 text-sm md:text-base">
            <thead className="bg-[#0C1C2E] text-cyan-300">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Analyst</th>
                <th className="p-3 text-left">Created</th>
                <th className="p-3 text-left">Severity</th>
              </tr>
            </thead>

            <tbody>
              {incidents.map((incident) => (
                <tr
                  key={incident._id}
                  className="border-b border-cyan-500/10 hover:bg-[#112233] transition"
                >
                  <td className="p-3">{incident._id?.slice(0, 8)}</td>
                  <td className="p-3">{incident.type || "N/A"}</td>
                  <td
                    className={`p-3 ${
                      statusColors[incident.status] || statusColors["Open"]
                    }`}
                  >
                    {incident.status || "Open"}
                  </td>
                  <td className="p-3">{incident.analyst || "Unassigned"}</td>
                  <td className="p-3">
                    {new Date(incident.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        incident.severity === "High"
                          ? "bg-red-500/20 text-red-300"
                          : incident.severity === "Medium"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-green-500/20 text-green-300"
                      }`}
                    >
                      {incident.severity || "Low"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
