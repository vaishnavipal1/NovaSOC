import Log from "../models/Log";
import { evaluateAll } from "../services/ruleEngine.service";

export const seedLogs = async ()=>{
  const sample = [
    { timestamp:new Date(), src_ip:"45.33.32.156", username:"unknown", failed_logins:7, payload:"", bytes_sent:1000, scan_ports:0, event_type:"login_attempt", threat_score:30 },
    { timestamp:new Date(), src_ip:"8.8.8.8", username:"alice", failed_logins:0, payload:"<script>alert(1)</script>", bytes_sent:100, scan_ports:0, event_type:"http_request", threat_score:20 },
    { timestamp:new Date(), src_ip:"192.168.10.20", username:"evil", failed_logins:1, payload:"SELECT * FROM users; --", bytes_sent:400, scan_ports:0, event_type:"http_request", threat_score:10 },
    { timestamp:new Date(), src_ip:"10.0.0.5", username:"scan-bot", failed_logins:0, payload:"", bytes_sent:0, scan_ports:20, event_type:"port_scan", threat_score:15 },
    { timestamp:new Date(), src_ip:"1.2.3.4", username:"exfil", failed_logins:0, payload:"", bytes_sent:900000000, scan_ports:0, event_type:"file_transfer", threat_score:90 },
    { timestamp:new Date(), src_ip:"3.4.5.6", username:"admin", failed_logins:0, payload:"", bytes_sent:200, scan_ports:0, event_type:"privilege_escalation", threat_score:95 },
  ];
  const saved = [];
  for(const s of sample){ const doc = await Log.create(s); saved.push(doc); }
  await evaluateAll(saved);
  console.log("seeded", saved.length);
};
