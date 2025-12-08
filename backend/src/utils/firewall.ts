import { exec } from "child_process";

// ---------------------------
// BLOCK IP
// ---------------------------
export function blockIP(ip: string): Promise<{ ok: boolean; err?: string }> {
  return new Promise((resolve) => {
    const cmd = `netsh advfirewall firewall add rule name="NovaSOC_Block_${ip}" dir=in action=block remoteip=${ip}`;

    console.log("🔥 Executing Firewall Block:", cmd);

    exec(cmd, (err) => {
      if (err) {
        return resolve({ ok: false, err: err.message });
      }
      resolve({ ok: true });
    });
  });
}

// ---------------------------
// UNBLOCK IP
// ---------------------------
export function unblockIP(ip: string): Promise<{ ok: boolean; err?: string }> {
  return new Promise((resolve) => {
    const cmd = `netsh advfirewall firewall delete rule name="NovaSOC_Block_${ip}"`;

    console.log("🧹 Executing Firewall Unblock:", cmd);

    exec(cmd, (err) => {
      if (err) {
        return resolve({ ok: false, err: err.message });
      }
      resolve({ ok: true });
    });
  });
}
