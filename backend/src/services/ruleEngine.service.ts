import { rules } from "../data/rules";
import Incident from "../models/Incident";
import BlockedIP from "../models/BlockedIP";
import { getIo } from "../sockets/socket";
import { blockIP } from "../utils/firewall";

// ⭐ VPN detection (score + provider)
import { computeVpnScore } from "../utils/vpnScore";

// ---------------------------------------------------
// PROCESS A SINGLE LOG
// ---------------------------------------------------
export async function processLog(log: any) {
  const incidents: any[] = [];

  console.log("🔍 Running rule engine on:", log.src_ip);

  // ⭐ Get VPN Score + Provider from detection system
  const { score: vpn_score, provider: vpn_provider } = computeVpnScore(log.src_ip);

  for (const r of rules) {
    if (!matchesRule(log, r)) continue;

    console.log("⚠️ Rule matched:", r.name);

    // ---------------------------------------------------
    // CREATE INCIDENT
    // ---------------------------------------------------
    const incident = await Incident.create({
      log: log._id,

      rule: {
        id: r.id,
        name: r.name,
        field: r.field,
        op: r.op,
        value: r.value,
        severity: r.severity,
        attack: r.attack,
      },

      severity: r.severity,
      attack: r.attack,
      target: "Web Server",
      status: "Open",
      analyst: "",

      // ⭐ VPN fields
      vpn_score,
      vpn_provider,

      isBlocked: false,
    });

    incidents.push(incident);

    // Realtime: push to UI
    getIo().emit("new_incident", incident);

    // ---------------------------------------------------
    // AUTO-BLOCK LOGIC
    // Only block HIGH + CRITICAL (EXCEPT VPN RULE)
    // ---------------------------------------------------
    const shouldBlock =
      (r.severity === "High" || r.severity === "Critical") &&
      r.id !== 10; // ID 10 = ML VPN rule → NEVER block it

    if (!shouldBlock) continue;

    const ip = log.src_ip;

    const exists = await BlockedIP.findOne({ ip });
    if (!exists) {
      const blockEntry = await BlockedIP.create({
        ip,
        reason: r.name,
        threat_score: log.threat_score ?? 0,
        incident_id: incident._id,
        auto_blocked: true,
      });

      console.log(`🛑 BLOCKED ${ip} | Reason: ${r.name}`);

      try {
        await blockIP(ip);
        console.log("✅ Firewall rule added:", ip);
      } catch (err: any) {
        console.warn("⚠️ Firewall block failed:", err.message);
      }

      // Push to frontend
      getIo().emit("ip_blocked", blockEntry);
    }
  }

  console.log("🟢 Incidents created:", incidents.length);
  return incidents;
}

// ---------------------------------------------------
// PROCESS MULTIPLE LOGS
// ---------------------------------------------------
export async function evaluateAll(logs: any[]) {
  const out: any[] = [];
  for (const l of logs) {
    out.push(...(await processLog(l)));
  }
  return out;
}

// ---------------------------------------------------
// RULE CHECKER
// ---------------------------------------------------
function matchesRule(log: any, rule: any) {
  const value = log[rule.field];

  switch (rule.op) {
    case ">":
      return typeof value === "number" && value > rule.value;
    case "==":
      return value === rule.value;
    case "in":
      return Array.isArray(rule.value) && rule.value.includes(value);
    case "regex":
      return value && new RegExp(rule.value, "i").test(String(value));
    default:
      return false;
  }
}
