// createAdmin.js  (run one time to seed an admin user)
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Analyst from "./models/Analyst.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const email = "admin@soc.local";       // 👈 login email
    const plainPassword = "Admin@123";     // 👈 login password

    const existing = await Analyst.findOne({ email });
    if (existing) {
      console.log("⚠️ Admin already exists with this email. Exiting.");
      process.exit(0);
    }

    const hashed = await bcrypt.hash(plainPassword, 10);

    const admin = await Analyst.create({
      name: "Super Admin",
      email,
      password: hashed,
      location: "HQ",
      role: "admin",
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
