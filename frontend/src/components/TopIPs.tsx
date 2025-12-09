"use client";

export default function TopIPs({ ips = [] }) {
  return (
    <div className="bg-[#0d1117] p-6 rounded-xl shadow-xl">
      <h2 className="text-xl font-semibold text-white mb-4">
        Top Attacker IPs
      </h2>

      <table className="w-full text-sm text-gray-300">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="py-2 text-left">IP Address</th>
            <th className="py-2 text-left">Attempts</th>
            <th className="py-2 text-left">Region</th>
          </tr>
        </thead>

        <tbody>
          {ips.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">
                No attacker data found
              </td>
            </tr>
          ) : (
            ips.map((item, i) => (
              <tr key={i} className="border-b border-gray-800">
                <td className="py-2">{item.ip}</td>
                <td className="py-2">{item.attempts}</td>
                <td className="py-2">{item.region}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
