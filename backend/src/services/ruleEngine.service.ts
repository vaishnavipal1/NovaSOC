import { rules } from "../data/rules";
import Incident from "../models/Incident";
import { getIo } from "../sockets/socket";

export async function processLog(log: any) {
  const incidents: any[] = [];

  console.log("🔍 Running rule engine on log:", log);

  for (const r of rules) {
    if (matchesRule(log, r)) {
      console.log("⚠️ Rule matched:", r.name);

      const inc = await Incident.create({
  log: log._id,
  rule: r,
  severity: r.severity,
  attack: r.name,
  target: "Web Server",
  status: "Open",
  analyst: ""
});

      incidents.push(inc);

      try {
        getIo().emit("new_incident", inc);
      } catch (e: any) {
        console.warn("Socket emit failed:", e.message);
      }
    }
  }

  console.log("🟢 Incidents created:", incidents.length);
  return incidents;
}

export async function evaluateAll(logs: any[]) {
  const results: any[] = [];
  for (const l of logs) {
    const created = await processLog(l);
    results.push(...created);
  }
  return results;
}

function matchesRule(log: any, rule: any) {
  const value = log[rule.field];

  switch (rule.op) {
    case ">":  return typeof value === "number" && value > rule.value;
    case "==": return value === rule.value;
    case "in": return Array.isArray(rule.value) && rule.value.includes(value);
    case "regex":
      if (!value) return false;
      return new RegExp(rule.value, "i").test(String(value));
    default:
      return false;
  }
}
