import axios from "axios";

const BACKEND_INGEST_URL = "http://localhost:4000/api/ingest";

const attackSamples = [
  {
    event_type: "xss",
    payload: "<script>alert('XSS')</script>",
    category: "Cross Site Scripting",
    severity: "Medium",
    score: 70
  },
  {
    event_type: "sql_injection",
    payload: "admin' OR '1'='1' -- DROP TABLE users; --",
    category: "SQL Injection",
    severity: "High",
    score: 92
  },
  {
    event_type: "bruteforce",
    payload: "Failed login attempt",
    category: "Brute Force",
    severity: "High",
    score: 95
  },
  {
    event_type: "recon_low",
    payload: "-",
    category: "Reconnaissance",
    severity: "Low",
    score: 15
  },
  {
    event_type: "port_scan_low",
    payload: "-",
    category: "Port Scan",
    severity: "Low",
    score: 10
  }
];

function randomIP() {
  const hotIPs = [
    "103.21.244.0",
    "45.155.205.90",
    "176.111.173.5"
  ];

  if (Math.random() < 0.3) {
    return hotIPs[Math.floor(Math.random() * hotIPs.length)];
  }

  return `${rand()}.${rand()}.${rand()}.${rand()}`;
  function rand() { return Math.floor(Math.random() * 255); }
}
const usernames = ["John Doe", "Alexander", "Marie", "Nova"];
const randomUser = usernames[Math.floor(Math.random() * usernames.length)];


export async function generateRandomLog() {
  const attack = attackSamples[Math.floor(Math.random() * attackSamples.length)];

  const normalizedAttackType =
    attack.event_type === "bruteforce" ? "Bruteforce" :
    attack.event_type === "sql_injection" ? "Malware" :
    attack.event_type === "xss" ? "Malware" :
    attack.event_type.includes("port_scan") ? "Recon" :
    attack.event_type.includes("recon") ? "Recon" :
    "Recon";

 const log = {
  timestamp: new Date(),
  src_ip: randomIP(),
  username: randomUser,          // 👈 Add this
  payload: attack.payload,
  event_type: attack.event_type,
  category: attack.category,
  severity: attack.severity,
  threat_score: attack.score,
  failed_logins: Math.floor(Math.random() * 6),
  bytes_sent: Math.floor(Math.random() * 5000),
  attack_type: normalizedAttackType
};


  console.log("🔥 AUTO-LOG GENERATED:", log);

  await axios.post(BACKEND_INGEST_URL, log);
}
