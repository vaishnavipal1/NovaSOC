"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export default function ThreatRadar({ data }: { data: any[] }) {
  return (
    <div className="bg-[#071a20] p-6 rounded-xl border border-cyan-700/30 shadow-lg">
      <h3 className="text-cyan-300 font-semibold mb-4">Threat Category Radar</h3>

      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#0ff" strokeOpacity={0.2} />
          <PolarAngleAxis dataKey="type" tick={{ fill: "#6ee7ff", fontSize: 12 }} />
          <PolarRadiusAxis angle={90} stroke="#0ff" strokeOpacity={0.3} tick={{ fill: "#777" }} />

          <Radar
            dataKey="count"
            stroke="#00e5ff"
            fill="#00e5ff"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

