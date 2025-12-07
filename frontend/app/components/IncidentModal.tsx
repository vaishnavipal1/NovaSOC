"use client";
import SeverityBadge from "./SeverityBadge";

export default function IncidentModal({ incident, onClose, onSave } : { incident: any, onClose: () => void, onSave: (updates: any) => void }) {
  if (!incident) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#071520] p-6 rounded-xl w-[700px] border border-cyan-600/30">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl text-cyan-300 font-bold">Incident #{incident._id?.slice(-6)}</h3>
          <button onClick={onClose} className="text-gray-300">Close</button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-gray-200">
          <div>
            <p className="text-sm text-gray-400">Rule</p>
            <p className="font-semibold">{incident.rule?.name || "Unknown"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Severity</p>
            <SeverityBadge level={incident.severity} />
          </div>

          <div>
            <p className="text-sm text-gray-400">Source IP</p>
            <p>{incident.log?.src_ip || "-"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Target</p>
            <p>{incident.target || incident.log?.target || "-"}</p>
          </div>

          <div className="col-span-2">
            <p className="text-sm text-gray-400">Payload / Message</p>
            <pre className="bg-[#081922] p-3 rounded text-sm text-gray-300 max-h-40 overflow-auto">{incident.log?.payload || "-"}</pre>
          </div>
        </div>

        <div className="mt-4 flex gap-3 items-center">
          <label className="text-sm text-gray-400">Status</label>
          <select defaultValue={incident.status} onChange={(e) => onSave({ status: e.target.value })} className="px-3 py-2 bg-[#0b1a24] border border-cyan-600/30 rounded text-white">
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <label className="text-sm text-gray-400 ml-4">Analyst</label>
          <input defaultValue={incident.analyst || ""} onBlur={(e) => onSave({ analyst: e.target.value })} className="px-3 py-2 bg-[#0b1a24] border border-cyan-600/30 rounded text-white" placeholder="Assign to..." />

          <div className="ml-auto">
            <button onClick={onClose} className="px-4 py-2 rounded bg-gray-700 text-white mr-2">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
