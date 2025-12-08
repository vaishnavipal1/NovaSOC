const fs = require("fs");
const path = require("path");

const rawPath = path.join(__dirname, "../src/data/vpn_raw.txt");
const outPath = path.join(__dirname, "../src/data/vpn_list.json");

if (!fs.existsSync(rawPath)) {
  console.error("❌ vpn_raw.txt not found at:", rawPath);
  process.exit(1);
}

let lines = fs.readFileSync(rawPath, "utf8")
  .split(/\r?\n/)
  .map(l => l.trim())
  .filter(l => l !== "")
  .map(l => l.replace(/^\[/, "")) // Remove leading “[”
  .map(l => l.replace(/\]$/, "")) // Remove trailing “]”
  .map(l => l.replace(/"/g, ""))  // Remove quotes
  .filter(l => l.match(/^\d+\.\d+\.\d+\.\d+\/\d+$/)); // Keep only valid CIDRs

fs.writeFileSync(outPath, JSON.stringify(lines, null, 2));

console.log("✅ Cleaned vpn_list.json with", lines.length, "valid CIDRs");
