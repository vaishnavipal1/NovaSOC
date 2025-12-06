import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema({
  log: { type: mongoose.Schema.Types.ObjectId, ref: "Log" },

  rule: {
    id: Number,
    name: String,
    field: String,
    op: String,
    value: mongoose.Schema.Types.Mixed,
    severity: String,
    attack: String
  },

  severity: { type: String, default: "Medium" },

  attack: { type: String, default: "" }, // e.g., "XSS Attempt", "Threat Score High"

  // new field for UI table
  target: { type: String, default: "Web Server" },

  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved"],
    default: "Open"
  },

  analyst: { type: String, default: "" }

}, { timestamps: true });

export default mongoose.model("Incident", IncidentSchema);
