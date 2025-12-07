"use client";
import { useEffect, useMemo, useState } from "react";
import TableCard from "./TableCard";
import SeverityBadge from "./SeverityBadge";
import IncidentFilters from "./IncidentFilters";
import IncidentModal from "./IncidentModal";
import socket from "../lib/socket";

export default function IncidentTable() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    severity: "",
    rule: "",
  });
  const [selected, setSelected] = useState<any | null>(null);

  const rulesList = useMemo(
    () =>
      Array.from(
        new Set(incidents.map((i) => i.rule?.name).filter(Boolean))
      ),
    [incidents]
  );

  /** Fetch all incidents on load */
  useEffect(() => {
    fetch("http://localhost:4000/api/incidents")
      .then((r) => r.json())
      .then((d) => setIncidents(d.incidents || []))
      .catch(() => setIncidents([]));
  }, []);

  /** Websocket listeners */
  useEffect(() => {
    socket.on("new_incident", (inc: any) =>
      setIncidents((prev) => [inc, ...prev])
    );

    socket.on("incident_updated", (inc: any) =>
      setIncidents((prev) =>
        prev.map((p) => (p._id === inc._id ? inc : p))
      )
    );

    return () => {
      socket.off("new_incident");
      socket.off("incident_updated");
    };
  }, []);

  /** Filtering logic */
  const filtered = incidents.filter((inc) => {
    if (filters.severity && inc.severity !== filters.severity) return false;
    if (filters.rule && inc.rule?.name !== filters.rule) return false;

    if (filters.search) {
      const s = filters.search.toLowerCase();
      const hay = JSON.stringify(inc).toLowerCase();
      if (!hay.includes(s)) return false;
    }
    return true;
  });

  /** Update status from dropdown */
  async function updateStatus(id: string, newStatus: string) {
    const res = await fetch(`http://localhost:4000/api/incidents/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await res.json();
    if (data.success) {
      setIncidents((prev) =>
        prev.map((i) => (i._id === id ? data.incident : i))
      );
    }
  }

  /** Save updates from modal */
  async function saveIncidentUpdates(updates: any) {
    if (!selected) return;

    const res = await fetch(
      `http://localhost:4000/api/incidents/${selected._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      }
    );

    const data = await res.json();
    if (data.success) {
      setSelected(data.incident);
    }
  }

  return (
    <TableCard>
      <IncidentFilters
        filters={filters}
        setFilters={setFilters}
        rules={rulesList}
      />

      <table className="w-full text-left text-gray-200">
        <thead>
          <tr className="text-cyan-400 border-b border-gray-700">
            <th className="py-2">ID</th>
            <th>Attack Type</th>
            <th>Severity</th>
            <th>Source IP</th>
            <th>Status</th>
            <th>Target</th>
            <th>Rule</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((inc, idx) => (
            <tr
              key={inc._id}
              className="border-b border-gray-800 hover:bg-[#0f2335]"
            >
              <td className="py-3">{idx + 1}</td>

              <td
                className="cursor-pointer"
                onClick={() => setSelected(inc)}
              >
                {inc.attack || inc.rule?.name || "Unknown"}
              </td>

              <td>
                <SeverityBadge level={inc.severity} />
              </td>

              <td>{inc.log?.src_ip || "-"}</td>

              {/* Status Dropdown */}
              <td>
                <select
                  className="bg-gray-800 text-white px-2 py-1 rounded"
                  value={inc.status}
                  onChange={(e) => updateStatus(inc._id, e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>

              <td>{inc.target || "-"}</td>

              <td>{inc.rule?.name || "-"}</td>

              <td>{new Date(inc.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <IncidentModal
        incident={selected}
        onClose={() => setSelected(null)}
        onSave={saveIncidentUpdates}
      />
    </TableCard>
  );
}
