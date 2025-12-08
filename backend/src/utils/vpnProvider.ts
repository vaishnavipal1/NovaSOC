import { ipToAsn } from "./asnLookup";
import { ipInCidr } from "./cidrCheck";
import vpnListRaw from "../data/vpn_list.json";
import { getProviderFromASN } from "./providerMap";

type VpnEntry = { cidr: string; provider?: string } | string;
const vpnList: VpnEntry[] = vpnListRaw as any;

export async function detectVpnProvider(ip: string): Promise<string | null> {
  // 1) ASN-based first (fast-ish)
  const asn = await ipToAsn(ip);
  const byAsn = getProviderFromASN(asn);
  if (byAsn) return byAsn;

  // 2) CIDR fallback (vpn_list.json might be large — but acceptable)
  for (const e of vpnList) {
    if (typeof e === "string") {
      if (ipInCidr(ip, e)) return null; // provider unknown for plain string list
    } else {
      if (ipInCidr(ip, e.cidr)) return e.provider || null;
    }
  }

  return null;
}
