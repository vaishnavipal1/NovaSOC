import { exec } from "child_process";

export function blockIP(ip: string) {
  if (!ip) return;

  const command = `netsh advfirewall firewall add rule name="NovaSOC Block ${ip}" dir=in action=block remoteip=${ip}`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Firewall block failed:", err.message);
      return;
    }
    console.log(`🔥 IP Blocked by Windows Firewall: ${ip}`);
  });
}
