"use client";
import React from "react";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#04060a] text-gray-200 flex">
      {/* Left sidebar */}
      <aside className="w-64 bg-[#021018] border-r border-cyan-900/30 p-6">
        <div className="text-cyan-300 text-2xl font-bold mb-8">NovaSOC</div>
        <nav className="space-y-4 text-gray-300">
          <a href="/dashboard" className="flex items-center gap-3 text-cyan-200 font-semibold">⚡ Dashboard</a>
          <a href="/logs" className="flex items-center gap-3">📜 Logs</a>
          <a href="/incidents" className="flex items-center gap-3">🛡 Incidents</a>
        </nav>
        <div className="mt-auto text-sm text-gray-500 mt-10">© NovaSOC</div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-cyan-300">Security Operations Dashboard</h1>
          <p className="text-gray-400 mt-1">Real-time threat detection & incident monitoring</p>
        </header>

        <div>{children}</div>
      </main>
    </div>
  );
}
