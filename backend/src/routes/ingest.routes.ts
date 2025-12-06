import { Router } from "express";
import Log from "../models/Log";
import { processLog } from "../services/ruleEngine.service";
;

const router = Router();

router.post("/", async (req, res) => {
  try {
    const log = req.body;
    console.log("🔥 LOG RECEIVED:", log);

    // 1️⃣ Save log to MongoDB
    const savedLog = await Log.create(log);

    // 2️⃣ Run rule engine on log
    const incidents = await processLog(savedLog);

    return res.json({
      success: true,
      message: "Log ingested and processed",
      log: savedLog,
      incidentsCreated: incidents.length,
      incidents
    });

  } catch (err) {
    console.error("❌ Error in /api/ingest:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
