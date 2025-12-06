"use client";

export default function HighRiskIPs({ ips }: { ips: any[] }) {
  return (
    <div className="bg-[#200707] p-6 rounded-xl border border-red-700/50 shadow-[0_0_20px_rgba(255,0,0,0.3)]">
      <div className="flex items-center gap-3 mb-4">
        <div className="animate-spin-slow">
          🚨
        </div>
        <h3 className="text-red-400 text-xl font-bold">High-Risk IPs</h3>
      </div>

      <ul className="space-y-3">
        {ips.map((ip, idx) => (
          <li key={idx} className="flex justify-between bg-[#3b0f0f] p-3 rounded-lg text-red-200">
            <span>{ip.ip}</span>
            <span className="font-bold">{ip.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
