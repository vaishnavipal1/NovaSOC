"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function ThreatLineChart({ data }: { data: { time: string; value: number }[] }) {
  return (
    <div className="bg-[#071a20] p-4 rounded-xl border border-cyan-700/20">
      <h3 className="text-cyan-300 font-semibold mb-2">Threat Attempts Over Time</h3>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#041620" />
            <XAxis dataKey="time" tick={{ fill: "#7dd3fc" }} />
            <YAxis tick={{ fill: "#7dd3fc" }} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#2dd4bf" strokeWidth={3} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
