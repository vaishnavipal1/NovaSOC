import ipaddr from "ipaddr.js";

/**
 * Check if an IP belongs to a CIDR range
 * Example: "2.56.16.5" in "2.56.16.0/22"
 */
export function ipInCidr(ip: string, cidr: string): boolean {
  try {
    const [range, prefix] = cidr.split("/");
    const ipAddr = ipaddr.parse(ip);
    const rangeAddr = ipaddr.parse(range);

    const ipBytes = ipAddr.toByteArray();
    const rangeBytes = rangeAddr.toByteArray();

    const prefixNum = parseInt(prefix, 10);
    const fullBytes = Math.floor(prefixNum / 8);
    const remainingBits = prefixNum % 8;

    // Compare full bytes
    for (let i = 0; i < fullBytes; i++) {
      if (ipBytes[i] !== rangeBytes[i]) return false;
    }

    // Compare remaining bits
    if (remainingBits > 0) {
      const mask = 0xff << (8 - remainingBits);
      if ((ipBytes[fullBytes] & mask) !== (rangeBytes[fullBytes] & mask)) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Check IP against full VPN list (array of CIDRs)
 */
export function isVPN(ip: string, vpnCidrs: string[]): boolean {
  return vpnCidrs.some((cidr) => ipInCidr(ip, cidr));
}
