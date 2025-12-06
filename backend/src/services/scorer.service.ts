export function scoreLog(log: any) {
  let score = log.threat_score || 10;

  if (log.failed_logins > 5) score += 20;
  if (/select|union|--/i.test(log.payload || "")) score += 30;
  if (/<script|onerror=/i.test(log.payload || "")) score += 20;
  if (log.bytes_sent && log.bytes_sent > 100000000) score += 25;

  return Math.min(100, score);
}
