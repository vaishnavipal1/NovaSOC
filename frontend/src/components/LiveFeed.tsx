"use client";
import React, { useEffect, useState } from "react";
import socket from "../lib/socket";

export default function LiveFeed() {
  const [feed, setFeed] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("http://localhost:4000/api/incidents?limit=10");
        const data = await res.json();
        setFeed(data.incidents || []);
      } catch (err) {
        console.error("LIVE FEED FETCH ERROR:", err);
      }
    }

    loadData();

    socket.on("new_incident", (inc: any) => {
      setFeed(prev => [inc, ...prev].slice(0, 20));
    });

    socket.on("incident_updated", (inc: any) => {
      setFeed(prev => prev.map(p => p._id === inc._id ? inc : p));
    });

    return () => {
      socket.off("new_incident");
      socket.off("incident_updated");
    };
  }, []);

  return (
    <div className="bg-[#071a20] p-4 rounded-xl border border-cyan-700/20 max-h-64 overflow-auto">
      <h3 className="text-cyan-300 font-semibold mb-3">Live Threat Feed</h3>
      <ul className="space-y-3">
        {feed.map((item: any) => (
          <li key={item._id} className="p-3 bg-[#041826] rounded flex justify-between items-start">
            <div>
              <div className="font-semibold">
                {item.attack || item.rule?.name || "Alert"}
              </div>
              <div className="text-sm text-gray-400">
                {item.log?.payload ? (item.log.payload + "").slice(0, 80) : "No payload"}
              </div>
            </div>
            <div className="text-sm text-gray-300">
              {new Date(item.createdAt).toLocaleTimeString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
