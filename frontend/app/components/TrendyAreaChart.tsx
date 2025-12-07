"use client";

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function TrendyAreaChart({ data }) {
  return (
    <div className="bg-[#071a20] p-6 rounded-xl border border-cyan-700/20 h-80">
      <h3 className="text-cyan-300 font-semibold mb-4">Threat Activity Trend</h3>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data}>
          <XAxis dataKey="time" stroke="#6ddcff" />
          <YAxis stroke="#6ddcff" />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#00eaff"
            fill="#00eaff50"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
