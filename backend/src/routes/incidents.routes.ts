// backend/src/routes/incidents.routes.ts

import { Router } from "express";
import Incident from "../models/Incident.ts";
import { getIo } from "../sockets/socket.ts";

const router = Router();

/* 1️⃣ GET incidents (with limit support) */
import BlockedIP from "../models/BlockedIP";

router.get("/", async (req, res) => {
  try {
    // 🔹 Fetch as plain objects (no Mongoose docs)
    let incidents = await Incident.find()
      .populate("log")
      .sort({ createdAt: -1 })
      .lean();

    // 🔹 Get blocked IPs
    const blocked = await BlockedIP.find().lean();
    const blockedSet = new Set(blocked.map((b) => b.ip));

    // 🔹 Attach isBlocked flag safely
    incidents = incidents.map((i: any) => {
      const ip =
        i.log && typeof i.log === "object" && "src_ip" in i.log
          ? i.log.src_ip
          : null;

      return {
        ...i,
        isBlocked: ip ? blockedSet.has(ip) : false,
      };
    });

    res.json({ success: true, incidents });
  } catch (err: any) {
    console.error("❌ Error fetching incidents:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});


/* 2️⃣ UPDATE incident (status or analyst) */
router.patch("/:id", async (req, res) => {
  try {
    const { status, analyst } = req.body;

    const allowed = ["Open", "In Progress", "Resolved"];

    if (status && !allowed.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updated = await Incident.findByIdAndUpdate(
      req.params.id,
      { status, analyst },
      { new: true }
    ).populate("log");

    if (!updated) return res.status(404).json({ error: "Not found" });

    getIo().emit("incident_updated", updated);

    return res.json({ success: true, incident: updated });
  } catch (e) {
    return res.status(500).json({ error: "Failed to update incident" });
  }
});


export default router;
