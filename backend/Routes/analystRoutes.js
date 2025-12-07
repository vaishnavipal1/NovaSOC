import express from "express";
import bcrypt from "bcryptjs";
import Analyst from "../models/Analyst.js";
import { protect, adminOnly } from "../middleware/authmiddleware.js";

const router = express.Router();

// GET /api/analysts  (protected, admin only)
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const analysts = await Analyst.find().sort({ createdAt: -1 });
    res.json(analysts);
  } catch (err) {
    console.error("GET /api/analysts error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// POST /api/analysts  (protected, admin only)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { name, email, password, location, role } = req.body;

    if (!name || !email || !password || !location) {
      return res
        .status(400)
        .json({ message: "All fields (name, email, password, location) are required." });
    }

    const exists = await Analyst.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const analyst = await Analyst.create({
      name,
      email,
      password: hashedPassword,
      location,
      role: role || "analyst",
    });

    res.status(201).json(analyst);
  } catch (err) {
    console.error("POST /api/analysts error:", err);
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already registered." });
    }
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// DELETE /api/analysts/:id  (protected, admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Analyst.findByIdAndDelete(req.params.id);
    res.json({ message: "Analyst deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/analysts/:id error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

export default router;
