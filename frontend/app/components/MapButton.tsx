"use client";

import { useRouter } from "next/navigation";

export default function MapButton() {
  const router = useRouter();

  return (
    <div className="bg-[#0d1117] p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
      <h2 className="text-lg text-white mb-3">Threat Map</h2>
      <button
        onClick={() => router.push("/map")}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white"
      >
        View Threats on Map →
      </button>
    </div>
  );
}
