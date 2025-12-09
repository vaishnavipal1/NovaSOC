import express from "express";
import Log from "../models/Log.js";
import Incident from "../models/Incident.js";
import axios from "axios";

const router = express.Router();

// 🔥 Prediction API (Python ML)
const ML_API_URL = "http://127.0.0.1:5001/predict";

router.post("/ingest-logs", async (req, res) => {
  try {
    const logs = req.body.logs;
    const io = req.app.get("io");

    const saved = [];

    for (const log of logs) {
      const mlRes = await axios.post(ML_API_URL, {
        text: log.message || "",
      });

      log.predictedType = mlRes.data.attack_type || "Unknown";
      log.predictedSeverity = mlRes.data.severity || "Low";

      const savedLog = await Log.create(log);
      saved.push(savedLog);

      if (io) io.emit("log_stream", savedLog);

      // 🚨 Create Incident If High Severity
      if (log.predictedSeverity === "High") {
        const incident = await Incident.create({
          logId: savedLog._id,
          attackType: savedLog.predictedType,
          severity: "High",
          sourceIP: savedLog.sourceIP,
          status: "Open",
          triggered: new Date(),
        });

        if (io) io.emit("incident_alert", incident);
      }
    }

    res.json({ message: "Logs processed", count: saved.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI threat detection failed" });
  }
});

export default router;




