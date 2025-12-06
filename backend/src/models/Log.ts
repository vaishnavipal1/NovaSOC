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

const LogSchema = new Schema<ILog>(
  {
    timestamp: { type: Date, default: Date.now },
    src_ip: { type: String, required: true },

    // your fields
    username: { type: String },
    payload: { type: String },
    event_type: { type: String },
    category: { type: String },
    severity: { type: String },
    failed_logins: { type: Number },
    bytes_sent: { type: Number },
    scan_ports: { type: Number },

    threat_score: { type: Number, default: 10 },
    attack_type: { type: String, default: "low-risk" }
  },
  { timestamps: true }
);

export default mongoose.model<ILog>("Log", LogSchema);
