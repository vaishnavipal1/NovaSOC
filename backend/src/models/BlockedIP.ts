import mongoose from "mongoose";

const BlockedIPSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  reason: { type: String, required: true },
  threat_score: { type: Number, default: 0 },
  incident_id: { type: mongoose.Schema.Types.ObjectId, ref: "Incident" },
  blocked_at: { type: Date, default: Date.now },
  auto_blocked: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("BlockedIP", BlockedIPSchema);
