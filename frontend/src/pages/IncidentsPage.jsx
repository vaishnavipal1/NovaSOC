import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/incidents")
      .then(res => setIncidents(res.data))
      .catch(err => console.log("Error fetching incidents", err));
  }, []);

  return (
    <div className="flex bg-[#000814] min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 md:ml-64 p-6 transition-all duration-300">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6">🛡 Incident Response Center</h1>

        <div className="overflow-x-auto rounded-lg border border-cyan-600 shadow-xl">
          <table className="w-full bg-[#0A1320] text-sm">
            <thead className="bg-[#002447] text-cyan-300">
              <tr>
                <th className="p-3">Incident ID</th>
                <th className="p-3">Attack Type</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Source IP</th>
                <th className="p-3">Triggered</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {incidents.length > 0 ? (
                incidents.map(i => (
                  <tr key={i._id} className="border-b border-cyan-600/10 hover:bg-[#122233]">
                    <td className="p-3">{i._id.slice(-6)}</td>
                    <td className="p-3 text-red-400 font-semibold">{i.attackType}</td>
                    <td className="p-3 text-red-500 font-bold">{i.severity}</td>
                    <td className="p-3">{i.sourceIP}</td>
                    <td className="p-3">{new Date(i.triggered).toLocaleString()}</td>
                    <td className="p-3">{i.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-400 p-6">
                     No active incidents — System is secure!
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


