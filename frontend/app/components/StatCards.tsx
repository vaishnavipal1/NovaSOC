"use client";
import React from "react";
import CountUp from "react-countup";

export default function StatCards({ stats }: { stats: { active: number; open: number; blocked: number } }) {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      {[
        { label: "Active Alerts", value: stats.active, color: "text-yellow-300" },
        { label: "Open Incidents", value: stats.open, color: "text-pink-300" },
        { label: "Threats Blocked", value: stats.blocked, color: "text-green-300" },
      ].map((s) => (
        <div key={s.label} className="bg-[#071a20] p-5 rounded-xl border border-cyan-700/20 shadow-lg">
          <div className="text-sm text-gray-400">{s.label}</div>
          <div className="mt-2 text-3xl font-bold">
            <CountUp end={s.value} duration={1.2} />
          </div>
          <div className={`mt-1 ${s.color}`}>●</div>
        </div>
      ))}
    </div>
  );
}
