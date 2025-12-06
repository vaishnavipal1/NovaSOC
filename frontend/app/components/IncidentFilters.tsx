"use client";
import React from "react";

export default function IncidentFilters({
  filters,
  setFilters,
  rules
}: {
  filters: { search: string; severity: string; rule: string };
  setFilters: (f: any) => void;
  rules: string[];
}) {
  return (
    <div className="flex gap-3 flex-wrap mb-4">
      <input
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        placeholder="Search IP, rule, analyst..."
        className="px-3 py-2 bg-[#0b1a24] border border-cyan-600/30 rounded text-white w-[320px]"
      />
      <select value={filters.severity} onChange={(e) => setFilters({ ...filters, severity: e.target.value })} className="px-3 py-2 bg-[#0b1a24] border border-cyan-600/30 rounded text-white">
        <option value="">All Severity</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select value={filters.rule} onChange={(e) => setFilters({ ...filters, rule: e.target.value })} className="px-3 py-2 bg-[#0b1a24] border border-cyan-600/30 rounded text-white">
        <option value="">All Rules</option>
        {rules.map((r) => <option key={r} value={r}>{r}</option>)}
      </select>
    </div>
  );
}
