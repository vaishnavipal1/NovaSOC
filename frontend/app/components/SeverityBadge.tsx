// frontend/app/components/SeverityBadge.tsx
export default function SeverityBadge({ level }: { level?: string }) {
  const colors: Record<string, string> = {
    High: "text-red-400 bg-red-900/10",
    Medium: "text-yellow-400 bg-yellow-900/10",
    Low: "text-green-400 bg-green-900/10",
    default: "text-gray-300 bg-gray-800/10",
  };
  const cls = colors[level || "default"] || colors.default;
  return (
    <span className={`px-2 py-1 rounded-md text-sm font-semibold ${cls}`}>
      {level || "Unknown"}
    </span>
  );
}
