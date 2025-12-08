import { isVPNCached, detectVpnProvider } from "./vpnCache";

export function computeVpnScore(ip: string) {
  const isVpn = isVPNCached(ip);
  const provider = detectVpnProvider(ip); // always null now

  if (!isVpn) {
    return { score: 10, provider: null };
  }

  // High confidence (80–99)
  return {
    score: 80 + Math.floor(Math.random() * 20),
    provider,
  };
}
