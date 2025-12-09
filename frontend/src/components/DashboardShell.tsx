"use client";
import React from "react";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#04060a] text-gray-200 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#021018] border-r border-cyan-900/30 p-6 flex flex-col">
        <div className="text-cyan-300 text-2xl font-bold mb-8">NovaSOC</div>

        <nav className="space-y-4 text-gray-300">
          <a
            href="/dashboard"
            className="flex items-center gap-3 text-cyan-200 font-semibold"
          >
            ⚡ Dashboard
          </a>
          <a
            href="/logs"
            className="flex items-center gap-3 hover:text-cyan-200 transition"
          >
            📜 Logs
          </a>
          <a
            href="/incidents"
            className="flex items-center gap-3 hover:text-cyan-200 transition"
          >
            🛡 Incidents
          </a>
        </nav>

        <div className="mt-auto text-sm text-gray-500 pt-10">© NovaSOC</div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-extrabold text-cyan-300">
              Security Operations Dashboard
            </h1>
            <p className="text-gray-400 mt-1">
              Real-time threat detection & incident monitoring
            </p>
          </header>

          <div className="space-y-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
