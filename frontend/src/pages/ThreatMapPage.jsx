import React, { useEffect, useState } from "react";

const ThreatMapPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/logs");
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="text-white p-6">
      <h2 className="text-2xl font-bold mb-4">🌍 Live Threat Map</h2>

      {logs.length === 0 ? (
        <p>Loading logs / No logs available...</p>
      ) : (
        <ul className="space-y-2">
          {logs.map((log) => (
            <li
              key={log._id}
              className="border border-cyan-400 rounded p-2 text-sm"
            >
              <strong>Source:</strong> {log.source_ip} →{" "}
              <strong>Target:</strong> {log.destination_ip}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThreatMapPage;



