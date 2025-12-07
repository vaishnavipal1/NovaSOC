import mongoose from "mongoose";

const analystSchema = new mongoose.Schema(
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
  mongoose.model("Analyst", analystSchema);
