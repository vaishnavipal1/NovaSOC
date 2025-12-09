import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  message: String,
  attack_type: String,
  severity: String,
  source_ip: String,
  destination_ip: String,
  src_country: String,
  src_lat: Number,
  src_lon: Number,
  vpn_detected: Boolean,
  confidence: Number,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Log", logSchema);

