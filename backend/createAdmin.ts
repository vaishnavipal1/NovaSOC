// createAdmin.ts (run one time to seed an admin user)
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Analyst from "./models/Analyst.ts";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

const run = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const email = "analyst1@soc.local"; // 👈 login email
    const plainPassword = "Analyst@123"; // 👈 login password

    const existing = await Analyst.findOne({ email });
    if (existing) {
      console.log("⚠️ Analyst already exists with this email. Exiting.");
      process.exit(0);
    }

    const hashed = await bcrypt.hash(plainPassword, 10);

    const admin = await Analyst.create({
      name: "John Analyst",
      email,
      password: hashed,
      location: "Security Operations",
      role: "analyst",
    });

    console.log("🎉 Admin user created:");
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${plainPassword}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
};

run();
