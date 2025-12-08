import ipaddr from "ipaddr.js";

export function randomIpFromCidr(cidr: string) {
  const [range, prefix] = cidr.split("/");
  const base = ipaddr.parse(range).toByteArray();
  
  const hostBits = 32 - parseInt(prefix);
  const maxHosts = Math.pow(2, hostBits);

  const offset = Math.floor(Math.random() * maxHosts);

  const ipInt =
    (base[0] << 24) |
    (base[1] << 16) |
    (base[2] << 8) |
    base[3];

  const newIpInt = ipInt + offset;

  const newIp = [
    (newIpInt >> 24) & 255,
    (newIpInt >> 16) & 255,
    (newIpInt >> 8) & 255,
    newIpInt & 255,
  ].join(".");

  return newIp;
}
