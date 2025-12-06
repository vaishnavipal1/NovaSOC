export default function TableCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#071520] p-6 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] border border-cyan-700/30 backdrop-blur-sm">
      {children}
    </div>
  );
}
