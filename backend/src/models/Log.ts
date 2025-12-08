import mongoose, { Schema, Document } from "mongoose";

export interface ILog extends Document {
  timestamp: Date;
  src_ip: string;
  username?: string;
  payload?: string;
  event_type?: string;
  category?: string;
  severity?: string;
  failed_logins?: number;
  bytes_sent?: number;
  scan_ports?: number;
  threat_score?: number;
  attack_type?: string;

  // Required for timestamps: true
  createdAt?: Date;
  updatedAt?: Date;
}

const LogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },

  src_ip: String,
  username: String,

  event_type: String,
  payload: String,
  category: String,
  severity: String,
  attack_type: String,

  failed_logins: Number,
  bytes_sent: Number,
  scan_ports: Number,
  threat_score: Number,

  // ML-related fields
  packets: Number,
  connections_per_min: Number,

  vpn_probability: { type: Number, default: 0 },
  ml_predicted_attack: { type: String, default: null },

  is_vpn: { type: Boolean, default: false },
  is_ddos: { type: Boolean, default: false },

}, { timestamps: true });

export default mongoose.model<ILog>("Log", LogSchema);
