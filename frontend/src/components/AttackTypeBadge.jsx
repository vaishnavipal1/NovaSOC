// src/components/AttackTypeBadge.jsx
import React from "react";

function AttackTypeBadge({ type }) {
  return (
    <span className="px-2 py-0.5 text-xs rounded-full bg-cyan-900/40 border border-cyan-500/40 text-cyan-200">
      {type || "Unknown"}
    </span>
  );
}

export default AttackTypeBadge;
