import asnMap from "../data/asn_providers.json";

export function getProviderFromASN(asn: string | null): string | null {
  if (!asn) return null;
  // asnMap keys like "AS209242"
  return (asnMap as Record<string, string>)[asn] || null;
}
