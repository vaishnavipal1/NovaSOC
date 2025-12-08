"use client";
import React from "react";
import CountUp from "react-countup";

interface StatProps {
  stats: {
    active: number;
    open: number;
    blocked: number;
    resolved: number;
  };
}

export default function StatCards({ stats }: StatProps) {
  const cards = [
    { label: "Active Alerts", value: stats.active, color: "text-yellow-300" },
    { label: "Open Incidents", value: stats.open, color: "text-pink-300" },
    { label: "Blocked IPs", value: stats.blocked, color: "text-red-400" },
    { label: "Resolved Incidents", value: stats.resolved, color: "text-blue-300" }
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-[#071a20] p-5 rounded-xl border border-cyan-700/20 shadow-lg"
        >
          <div className="text-sm text-gray-400">{c.label}</div>

          <div className="mt-2 text-3xl font-bold">
            <CountUp end={c.value} duration={1.2} />
          </div>

          <div className={`mt-1 ${c.color}`}>●</div>
        </div>
      ))}
    </div>
  );
}
