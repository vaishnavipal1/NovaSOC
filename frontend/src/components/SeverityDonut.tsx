"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#10b981",
};

export default function SeverityDonut({ data }: { data: { name: string; value: number }[] }) {
  const colors = data.map(d => COLORS[d.name as keyof typeof COLORS] || "#60a5fa");
  return (
    <div className="bg-[#071a20] p-4 rounded-xl border border-cyan-700/20">
      <h3 className="text-cyan-300 font-semibold mb-2">Severity Distribution</h3>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
              {data.map((entry, index) => <Cell key={index} fill={colors[index]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
