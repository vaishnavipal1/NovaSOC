"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AttackAreaTrend({ data }: { data: any[] }) {
  return (
    <div className="bg-[#071a20] p-6 rounded-xl border border-cyan-700/30 shadow-lg">
      <h3 className="text-cyan-300 font-semibold mb-4">Advanced Attack Activity Trend</h3>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorAttack" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00eaff" stopOpacity={0.7}/>
              <stop offset="100%" stopColor="#003344" stopOpacity={0.2}/>
            </linearGradient>
          </defs>

          <XAxis dataKey="time" stroke="#66eaff" />
          <YAxis stroke="#66eaff" />
          <Tooltip contentStyle={{ background: "#021a27", border: "1px solid #0ff" }} />

          <Area type="monotone" dataKey="value" stroke="#00eaff" fill="url(#colorAttack)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
