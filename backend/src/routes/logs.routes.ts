import { Router } from "express";
import Log from "../models/Log";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 }).lean();
    return res.json({ logs });
  } catch (err: any) {
    console.error("GET /api/logs ERROR:", err);
    return res.status(500).json({ error: "Failed to fetch logs" });
  }
});

export default router;
