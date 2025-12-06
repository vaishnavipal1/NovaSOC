import Sidebar from "../components/Sidebar";

const incidents = [
  {
    id: 1001,
    type: "Unauthorized Access",
    status: "Open",
    analyst: "John Doe",
    createdAt: "2025-12-04 10:22",
    rule: "Repeated Port Scans",
  },
  {
    id: 1002,
    type: "Malware Detected",
    status: "Investigating",
    analyst: "Aditya",
    createdAt: "2025-12-04 11:40",
    rule: "Signature Match",
  },
];

export default function Incidents() {
  return (
    <div className="flex bg-[#000814] min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 md:ml-64 p-6 transition-all duration-300">
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6">
          🛡 Incident Response
        </h1>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full bg-[#0A1320] border border-cyan-500/20 text-sm md:text-base">
            <thead className="bg-[#0C1C2E] text-cyan-300">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Analyst</th>
                <th className="p-3">Created</th>
                <th className="p-3">Rule Triggered</th>
              </tr>
            </thead>

            <tbody>
              {incidents.map((i) => (
                <tr
                  key={i.id}
                  className="border-b border-cyan-500/10 hover:bg-[#112233] transition"
                >
                  <td className="p-3">{i.id}</td>
                  <td className="p-3">{i.type}</td>
                  <td className="p-3">{i.status}</td>
                  <td className="p-3">{i.analyst}</td>
                  <td className="p-3">{i.createdAt}</td>
                  <td className="p-3">{i.rule}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
