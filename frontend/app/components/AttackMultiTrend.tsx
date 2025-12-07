"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AttackMultiTrend({ data }: { data: any[] }) {
  return (
    <div className="bg-[#0d1117] rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Attack Trends by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#bbb" />
          <YAxis stroke="#bbb" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Bruteforce" stroke="#ff4d4d" strokeWidth={2} />
          <Line type="monotone" dataKey="Malware" stroke="#00d4ff" strokeWidth={2} />
          <Line type="monotone" dataKey="Recon" stroke="#00ff99" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
