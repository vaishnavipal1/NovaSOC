import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ThreatLineChart({ data }) {
  // Small guard + debug log (only in dev)
  if (process.env.NODE_ENV !== "production") {
    console.log("ThreatLineChart raw data:", data);
  }

  const safeArray = Array.isArray(data) ? data : [];

  // 🔧 Normalize whatever backend sends into { time, value }
  const normalizedData = safeArray.map((item, index) => ({
    time:
      item.time ||
      item.label ||
      item.timestamp ||
      item.createdAt ||
      `Point ${index + 1}`,
    value:
      item.value ??
      item.count ??
      item.total ??
      item.threats ??
      item.num ??
      0,
  }));

  if (!normalizedData.length) {
    return (
      <div className="bg-[#071a20] p-4 rounded-xl border border-cyan-700/20">
        <h3 className="text-cyan-300 font-semibold mb-2">
          Threat Attempts Over Time
        </h3>
        <p className="text-sm text-cyan-200/70">No data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#071a20] p-4 rounded-xl border border-cyan-700/20">
      <h3 className="text-cyan-300 font-semibold mb-2">
        Threat Attempts Over Time
      </h3>

      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <LineChart data={normalizedData}>
            <CartesianGrid stroke="#041620" />
            <XAxis dataKey="time" tick={{ fill: "#7dd3fc" }} />
            <YAxis tick={{ fill: "#7dd3fc" }} allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2dd4bf"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
