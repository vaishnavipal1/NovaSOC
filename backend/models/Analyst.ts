import mongoose, { Document, Schema } from "mongoose";

interface IAnalyst extends Document {
  name: string;
  email: string;
  password: string;
  location: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const analystSchema = new Schema<IAnalyst>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // will store HASH, not plain text
    location: { type: String, required: true },
    role: { type: String, default: "analyst" }, // "admin" / "analyst"
  },
  { timestamps: true }
);

export default mongoose.models.Analyst ||
  mongoose.model<IAnalyst>("Analyst", analystSchema);
