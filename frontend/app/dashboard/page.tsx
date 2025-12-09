"use client";

import { useEffect, useState } from "react";

import DashboardShell from "@/app/components/DashboardShell";
import StatCards from "@/app/components/StatCards";
import ThreatLineChart from "@/app/components/ThreatLineChart";
import SeverityDonut from "@/app/components/SeverityDonut";
import RadarThreatChart from "@/app/components/RadarThreatChart";
import AttackMultiTrend from "@/app/components/AttackMultiTrend";
import LiveFeed from "@/app/components/LiveFeed";
import TopIPs from "@/app/components/TopIPs";

export default function DashboardPage() {
  const [stats, setStats] = useState({ active: 0, open: 0, blocked: 0 });
  const [lineData, setLineData] = useState([]);
  const [severityData, setSeverityData] = useState([]);
  const [radarData, setRadarData] = useState([]);
  const [multiTrend, setMultiTrend] = useState([]);
  const [topIPs, setTopIPs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [
          summary,
          line,
          sev,
          radar,
          trend,
          top
        ] = await Promise.all([
          fetch("http://localhost:4000/api/analytics/summary", { headers }).then(r => r.json()),
          fetch("http://localhost:4000/api/analytics/trend-multi", { headers }).then(r => r.json()),
          fetch("http://localhost:4000/api/analytics/severity", { headers }).then(r => r.json()),
          fetch("http://localhost:4000/api/analytics/categories", { headers }).then(r => r.json()),
          fetch("http://localhost:4000/api/analytics/trend-multi", { headers }).then(r => r.json()),
          fetch("http://localhost:4000/api/analytics/top-ips", { headers }).then(r => r.json()),
        ]);

        setStats(summary.stats || { active: 0, open: 0, blocked: 0 });
        setLineData(line.data || []);
        setSeverityData(sev.data || []);
        setRadarData(radar.data || []);
        setMultiTrend(trend.data || []);
        setTopIPs(top.data || []);
      } catch (error) {
        console.error("Dashboard load failed:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#000814] min-h-screen text-white p-6 md:p-8 flex items-center justify-center">
        <p className="text-cyan-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <DashboardShell>
      <StatCards stats={stats} />

      {/* ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ThreatLineChart data={lineData} />
        <SeverityDonut data={severityData} />
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RadarThreatChart data={radarData} />
        <AttackMultiTrend data={multiTrend} />
      </div>

      {/* ROW 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <LiveFeed />
        </div>

        <div className="space-y-6">
          <TopIPs ips={topIPs} />
        </div>
      </div>
    </DashboardShell>
  );
}
