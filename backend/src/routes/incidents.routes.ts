// backend/src/routes/incidents.routes.ts

import { Router } from "express";
import Incident from "../models/Incident";
import { getIo } from "../sockets/socket";

const router = Router();

/* 1️⃣ GET incidents (with limit support) */
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;

   const incidents = await Incident.find()
  .populate("log")     // <– FIX: pulls full Log including src_ip, username, etc
  .sort({ createdAt: -1 })
  .lean();

    res.json({
      success: true,
      incidents
    });
  } catch (err: any) {
    console.error("GET /api/incidents error:", err);
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
