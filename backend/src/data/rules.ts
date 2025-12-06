export const rules = [
  { id:1, name:"Multiple Failed Logins", field:"failed_logins", op:">", value:5, severity:"High", attack:"Brute Force" },
  { id:2, name:"SQL Injection Pattern", field:"payload", op:"regex", value:"(\\bSELECT\\b|\\bUNION\\b|--)", severity:"High", attack:"SQLi" },
  { id:3, name:"XSS Attempt", field:"payload", op:"regex", value:"(<script|onerror=|<img)", severity:"Medium", attack:"XSS" },
  { id:4, name:"Port Scan Behavior", field:"scan_ports", op:">", value:10, severity:"Medium", attack:"Port Scan" },
  { id:5, name:"Large Data Transfer", field:"bytes_sent", op:">", value:500000000, severity:"High", attack:"Data Exfiltration" },
  { id:6, name:"Suspicious IP", field:"src_ip", op:"in", value:["45.33.32.156","192.168.10.20"], severity:"Critical", attack:"Reputation" },
  { id:7, name:"Privilege Escalation Event", field:"event_type", op:"==", value:"privilege_escalation", severity:"High", attack:"Privilege Escalation" },
  { id:8, name:"Threat Score High", field:"threat_score", op:">", value:80, severity:"High", attack:"General Threat" }
];
