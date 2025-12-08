import { Router } from "express";
import BlockedIP from "../models/BlockedIP";
import { unblockIP } from "../utils/firewall";

const router = Router();

// GET ALL BLOCKED IPs
router.get("/", async (req, res) => {
  const list = await BlockedIP.find().sort({ createdAt: -1 });
  res.json({ blocked: list });
});

// UNBLOCK an IP
router.post("/unblock/:ip", async (req, res) => {
  const ip = req.params.ip;

  try {
    const removed = await BlockedIP.findOneAndDelete({ ip });
    if (!removed) return res.json({ success: false, msg: "IP not in blocklist" });

    const fw = await unblockIP(ip);

    res.json({ success: true, firewall: fw });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
