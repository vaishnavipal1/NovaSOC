// src/components/SeverityBadge.jsx
import React from "react";

const colors = {
  Low: "bg-emerald-900/40 text-emerald-300 border-emerald-500/40",
  Medium: "bg-amber-900/40 text-amber-300 border-amber-500/40",
  High: "bg-rose-900/40 text-rose-300 border-rose-500/40",
};

function SeverityBadge({ level }) {
  const cls =
    colors[level] ||
    "bg-slate-800/60 text-slate-200 border-slate-500/50";

  return (
    <span
      className={`px-2 py-0.5 text-xs border rounded-full font-medium tracking-wide ${cls}`}
    >
      {level || "Unknown"}
    </span>
  );
}

export default SeverityBadge;




